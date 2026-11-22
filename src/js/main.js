var AccordionBoxIcons = {
    'default': "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960'><path d='m357-384 123-123 123 123 57-56-180-180-180 180zM480-80q-83 0-156-31.5T197-197t-85.5-127T80-480t31.5-156T197-763t127-85.5T480-880t156 31.5T763-763t85.5 127T880-480t-31.5 156T763-197t-127 85.5T480-80m0-80q134 0 227-93t93-227-93-227-227-93-227 93-93 227 93 227 227 93m0-320'/></svg>",
    'test': "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960'><path d='M480-345 240-585l56-56 184 183 184-183 56 56z'/></svg>"
};




/**
 * 
 * @param {Object}                  schema 
 * @param {HTMLElement|CSSRule}     schema.parent
 * @param {String}                  schema.title
 * @param {String}                 [schema.subtitle]
 */
function AccordionBox( schema ) {

    /**
     * @property
     * @private
     * @type {Object}
     */
    this._schema = schema

    /**
     * @property
     * @private
     * @type {HTMLElement}
     */
    this._parentElem = null;

    /**
     * @property
     * @private
     * @type {HTMLElement}
     */
    this._ribbonElem = null;

    /**
     * @property
     * @private
     * @type {HTMLElement}
     */
    this._wrapElem = null;

    /**
     * @property
     * @private
     * @type {HTMLElement}
     */
    this._contentElem = null;

    /**
     * @property
     * @private
     * @type {HTMLElement}
     */
    this._titleElem = null;

    /**
     * @property
     * @private
     * @type {CallableFunction}
     */
    this._handleClickTitle = this._evt_click_titleElem.bind( this );




    if ( typeof schema.parent === 'object' ) {

        this._parentElem = schema.parent;

    } else if ( typeof schema.parent === 'string' ) {

        this._parentElem = document.querySelector( schema.parent );

    }

    this._ribbonElem    = this._parentElem.querySelector( 'accordion-ribbon' );
    this._wrapElem      = this._parentElem.querySelector( 'accordion-wrap' );
    this._contentElem   = this._parentElem.querySelector( 'accordion-content' );

    this._ribbonElem.addEventListener( 'click', this._handleClickTitle );

    this._createFromSchema();

};




/**
 * @method
 * @public
 * @returns {void}
 */
AccordionBox.prototype.destroy = function () {

    if ( this._parentElem === null ) {

        return;

    }

    this._ribbonElem.removeEventListener( 'click', this._handleClickTitle );

    this._parentElem.remove();

    this._schema           = null;
    this._parentElem       = null;
    this._ribbonElem       = null;
    this._wrapElem         = null;
    this._contentElem      = null;
    this._titleElem        = null;
    this._handleClickTitle = null;

};




/**
 * @method
 * @private
 * @returns {void}
 */
AccordionBox.prototype._evt_click_titleElem = function() {

    this._parentElem.classList.toggle( 'open' );

};

/**
 * @method
 * @private
 * @returns {void}
 */
AccordionBox.prototype._createFromSchema = function() {

    const fragment = document.createDocumentFragment();

    this._titleElem = document.createElement( 'DIV' );
    this._titleElem.classList.add( 'title' );
    this._ribbonElem.appendChild( this._titleElem );

    const titleSpanElem = document.createElement( 'LABEL' );
    titleSpanElem.innerHTML = this._schema.title;
    titleSpanElem.classList.add( 'titleElem' );
    this._titleElem.appendChild( titleSpanElem );

    if ( this._schema.hasOwnProperty( 'subtitle' ) ) {

        const subtitleSpanElem = document.createElement( 'SPAN' );
        subtitleSpanElem.innerHTML = this._schema.subtitle;
        subtitleSpanElem.classList.add( 'subtitleElem' );
        this._titleElem.appendChild( subtitleSpanElem );

    }

    const iconElem = document.createElement( 'SPAN' );
    iconElem.classList.add( 'icon' );
    iconElem.innerHTML = AccordionBoxIcons[ 'test' ];
    this._ribbonElem.appendChild( iconElem );

    this._parentElem.appendChild( fragment );

};