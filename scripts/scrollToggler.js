const MOBILE_SCREEN_WIDTH = 767;

export class ScrollToggler {
    _isMobile = null;
    _isHistoryOpened = false;

    constructor() {
        this._bindEvents();

        this._isMobile = this._getIsMobile();
    }

    _getIsMobile() {
        return window.innerWidth <= MOBILE_SCREEN_WIDTH;
    }

    _togglePageScroll() {
        document.body.classList.toggle('scroll-blocked');
    }

    // when platform changed we must toggle page scroll while history is opened
    _onChangePlatform() {
        console.log('Platform changed');
        if (!this._isHistoryOpened) return;

        this._togglePageScroll();
    }

    _onToggleHistory(isHistoryOpened) {
        this._isHistoryOpened = isHistoryOpened;

        if (!this._isMobile) return;
        
        this._togglePageScroll();
    }

    _onResize() {
        const currentIsMobile = this._getIsMobile();
        
        if (currentIsMobile === this._isMobile) return;
        
        this._onChangePlatform();

        this._isMobile = currentIsMobile;
    }

    _bindEvents() {
        document.addEventListener('toggle-history', ({ detail }) => this._onToggleHistory(detail));

        window.addEventListener('resize', () => this._onResize());
    }
}