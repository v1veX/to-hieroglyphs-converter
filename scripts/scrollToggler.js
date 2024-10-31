const MOBILE_SCREEN_WIDTH = 767;

export class ScrollToggler {
    _initialPlatform = null;
    _isHistoryOpened = false;

    constructor() {
        this._bindEvents();

        this._initialPlatform = this._getCurrentPlatform();
    }

    _getCurrentPlatform() {
        const isMobile = window.innerWidth <= MOBILE_SCREEN_WIDTH;
        return isMobile ? 'mobile' : 'desktop';
    }

    _togglePageScroll() {
        document.body.classList.toggle('scroll-blocked');
    }

    _onChangePlatform() {
        if (!this._isHistoryOpened) return;

        this._togglePageScroll();
    }

    _onToggleHistory(isHistoryOpened) {
        this._isHistoryOpened = isHistoryOpened;

        if (this._initialPlatform !== 'mobile') return;
        
        this._togglePageScroll();
    }

    _onResize() {
        const currentPlatform = this._getCurrentPlatform();
        
        // when platform changed we must toggle page scroll while history is opened
        if (currentPlatform !== this._initialPlatform) {
            this._onChangePlatform();
        }

        this._initialPlatform = currentPlatform;
    }

    _bindEvents() {
        document.addEventListener('toggle-history', ({ detail }) => this._onToggleHistory(detail));

        window.addEventListener('resize', () => this._onResize());
    }
}