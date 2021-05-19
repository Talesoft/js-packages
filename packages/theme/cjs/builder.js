"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTheme = createTheme;
exports.createDefaultTheme = createDefaultTheme;
exports.default = exports.TextFormatBuilder = exports.FontBuilder = exports.ColorShadeListBuilder = void 0;

var _colors = require("./colors");

var _typography = require("./typography");

var _theme = require("./theme");

class ColorShadeListBuilder {
  constructor(shadeList) {
    this.shadeList = shadeList;
  }

  shadesOf(colorString, length = 10, spread = 0.1) {
    return new ColorShadeListBuilder((0, _colors.createColorShades)(colorString, length, spread));
  }

}

exports.ColorShadeListBuilder = ColorShadeListBuilder;

class FontBuilder {
  constructor(font) {
    this.font = font;
  }

  googleOpenFont(name, weights) {
    const styleIndexes = {
      normal: 0,
      italic: 1
    };
    const imports = Object.entries(weights).flatMap(([weight, styles]) => styles.map(style => `${styleIndexes[style]},${_typography.textWeightMap[weight]}`)).join(';');
    return new FontBuilder({
      name: name,
      url: `https://fonts.googleapis.com/css2?family=${name.replace(' ', '+')}:ital,wght@${imports}&display=swap`
    });
  }

}

exports.FontBuilder = FontBuilder;

class TextFormatBuilder {
  constructor(format) {
    this.format = format;
  }

  font(name) {
    return new TextFormatBuilder({ ...this.format,
      font: name
    });
  }

}

exports.TextFormatBuilder = TextFormatBuilder;

class ThemeBuilder {
  constructor(theme) {
    this.theme = theme;
  }

  space(spacing) {
    return new ThemeBuilder({ ...this.theme,
      spacing
    });
  }

  color(name, build) {
    var _currentTheme$colors$;

    const currentTheme = this.theme;
    const existingShadeList = (_currentTheme$colors$ = currentTheme.colors[name]) !== null && _currentTheme$colors$ !== void 0 ? _currentTheme$colors$ : {};
    const newShadeList = build(new ColorShadeListBuilder(existingShadeList)).shadeList;
    return new ThemeBuilder({ ...currentTheme,
      colors: { ...currentTheme.colors,
        [name]: newShadeList
      }
    });
  }

  fontSize(size) {
    return new ThemeBuilder({ ...this.theme,
      typography: { ...this.theme.typography,
        size
      }
    });
  }

  font(name, build) {
    var _currentTheme$typogra;

    const currentTheme = this.theme;
    const existingFont = (_currentTheme$typogra = currentTheme.typography.fonts[name]) !== null && _currentTheme$typogra !== void 0 ? _currentTheme$typogra : {};
    const newFont = build(new FontBuilder(existingFont)).font;
    return new ThemeBuilder({ ...currentTheme,
      typography: { ...currentTheme.typography,
        fonts: { ...currentTheme.typography.fonts,
          [name]: newFont
        }
      }
    });
  }

  textStyle(name, build) {
    var _currentTheme$typogra2;

    const currentTheme = this.theme;
    const existingFormat = (_currentTheme$typogra2 = currentTheme.typography.formats[name]) !== null && _currentTheme$typogra2 !== void 0 ? _currentTheme$typogra2 : {};
    const newFormat = build(new TextFormatBuilder(existingFormat)).format;
    return new ThemeBuilder({ ...currentTheme,
      typography: { ...currentTheme.typography,
        formats: { ...currentTheme.typography.formats,
          [name]: newFormat
        }
      }
    });
  }

}

exports.default = ThemeBuilder;

function createTheme(theme) {
  return new ThemeBuilder(theme);
}

function createDefaultTheme() {
  return createTheme(_theme.defaultTheme);
}