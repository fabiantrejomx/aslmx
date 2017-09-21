import { Injectable } from '@angular/core';

declare let jQuery: any;

@Injectable()
export class AppConfig {
  config = {
    name: 'sing',
    title: '',
    version: '3.2.0',
    debug: true,
    settings: {
      colors: {
        'white': '#fff',
        'black': '#000',
        'gray-light': '#999',
        'gray-lighter': '#eee',
        'gray': '#666',
        'gray-dark': '#343434',
        'gray-darker': '#222',
        'gray-semi-light': '#777',
        'gray-semi-lighter': '#ddd',
        'brand-primary': '#5d8fc2',
        'brand-success': '#64bd63',
        'brand-warning': '#f0b518',
        'brand-danger': '#dd5826',
        'brand-info': '#5dc4bf'
      },
      screens: {
        'xs-max': 543,
        'sm-min': 544,
        'sm-max': 767,
        'md-min': 768,
        'md-max': 991,
        'lg-min': 992,
        'lg-max': 1199,
        'xl-min': 1200
      },
      navCollapseTimeout: 2500
    },

    
    state: {
      
      'nav-static': true
    }
  };

  _resizeCallbacks: any = [];
  _enter:any = [];
  _exit:any = [];
  _screenSizeCallbacks = {
    xs: {enter: this._enter, exit: this._exit},
    sm: {enter: this._enter, exit: this._exit},
    md: {enter: this._enter, exit: this._exit},
    lg: {enter: this._enter, exit: this._exit},
    xl: {enter: this._enter, exit: this._exit}
  };

  isScreen(size:any): boolean {
    let screenPx = window.innerWidth;
    return (screenPx >= this.config.settings.screens[size + '-min'] || size === 'xs')
      && (screenPx <= this.config.settings.screens[size + '-max'] || size === 'xl');
  }

  getScreenSize(): string {
    let screenPx = window.innerWidth;
    if (screenPx <= this.config.settings.screens['xs-max']) { return 'xs'; }
    if ((screenPx >= this.config.settings.screens['sm-min'])
      && (screenPx <= this.config.settings.screens['sm-max'])) { return 'sm'; }
    if ((screenPx >= this.config.settings.screens['md-min'])
      && (screenPx <= this.config.settings.screens['md-max'])) { return 'md'; }
    if ((screenPx >= this.config.settings.screens['lg-min'])
      && (screenPx <= this.config.settings.screens['lg-max'])) { return 'lg'; }
    if (screenPx >= this.config.settings.screens['xl-min']) { return 'xl'; }
  }

  onScreenSize(size:any, fn:any,onEnter:any): void {
    onEnter = typeof onEnter !== 'undefined' ? onEnter : true;
    if (typeof size === 'object') {
      for (let i = 0; i < size.length; i++) {
        this._screenSizeCallbacks[size[i]][onEnter ? 'enter' : 'exit'].push(fn);
      }
    } else {
      this._screenSizeCallbacks[size][onEnter ? 'enter' : 'exit'].push(fn);
    }

  }

  changeColor(color:any, ratio:any, darker:any): string {
    let pad = function (num:any, totalChars:any): number {
      let padVal = '0';
      num = num + '';
      while (num.length < totalChars) {
        num = padVal + num;
      }
      return num;
    };
    color = color.replace(/^\s*|\s*$/, '');

    color = color.replace(
      /^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i,
      '#$1$1$2$2$3$3'
    );

    let difference = Math.round(ratio * 256) * (darker ? -1 : 1),
      rgb = color.match(new RegExp('^rgba?\\(\\s*' +
        '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
        '\\s*,\\s*' +
        '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
        '\\s*,\\s*' +
        '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
        '(?:\\s*,\\s*' +
        '(0|1|0?\\.\\d+))?' +
        '\\s*\\)$'
        , 'i')),
      alpha = !!rgb && rgb[4] !== null ? rgb[4] : null,

      decimal = !!rgb ? [rgb[1], rgb[2], rgb[3]] : color.replace(
        /^#?([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])/i,
        function (): string {
          return parseInt(arguments[1], 16) + ',' +
            parseInt(arguments[2], 16) + ',' +
            parseInt(arguments[3], 16);
        }
      ).split(/,/);

    return !!rgb ?
    'rgb' + (alpha !== null ? 'a' : '') + '(' +
    Math[darker ? 'max' : 'min'](
      parseInt(decimal[0], 10) + difference, darker ? 0 : 255
    ) + ', ' +
    Math[darker ? 'max' : 'min'](
      parseInt(decimal[1], 10) + difference, darker ? 0 : 255
    ) + ', ' +
    Math[darker ? 'max' : 'min'](
      parseInt(decimal[2], 10) + difference, darker ? 0 : 255
    ) +
    (alpha !== null ? ', ' + alpha : '') +
    ')' :
      [
        '#',
        pad(Math[darker ? 'max' : 'min'](
          parseInt(decimal[0], 10) + difference, darker ? 0 : 255
        ).toString(16), 2),
        pad(Math[darker ? 'max' : 'min'](
          parseInt(decimal[1], 10) + difference, darker ? 0 : 255
        ).toString(16), 2),
        pad(Math[darker ? 'max' : 'min'](
          parseInt(decimal[2], 10) + difference, darker ? 0 : 255
        ).toString(16), 2)
      ].join('');
  }

  lightenColor(color:any, ratio:any): any {
    return this.changeColor(color, ratio, false);
  }

  darkenColor(color:any, ratio:any): any {
    return this.changeColor(color, ratio, true);
  }

  max(array:any): any {
    return Math.max.apply(null, array);
  }

  min(array:any): any {
    return Math.min.apply(null, array);
  }

  _initResizeEvent(): void {
    let resizeTimeout:any;

    jQuery(window).on('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        jQuery(window).trigger('sn:resize');
      }, 100);
    });
  }

  _initOnScreenSizeCallbacks(): void  {
    let resizeTimeout:any,
      prevSize = this.getScreenSize();

    jQuery(window).resize(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        let size = this.getScreenSize();
        if (size !== prevSize) { 
          this._screenSizeCallbacks[prevSize].exit.forEach((fn:any) => {
            fn(size, prevSize);
          });
          this._screenSizeCallbacks[size].enter.forEach((fn:any) => {
            fn(size, prevSize);
          });
          console.log('screen changed. new: ' + size + ', old: ' + prevSize);
        }
        prevSize = size;
      }, 100);
    });
  }

  constructor() {
    this._initResizeEvent();
    this._initOnScreenSizeCallbacks();
  }

  getConfig(): Object {
    return this.config;
  }
}

