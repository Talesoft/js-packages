"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSpace = isSpace;
exports.isRgb = isRgb;
exports.isRgba = isRgba;
exports.isAnyRgb = isAnyRgb;
exports.isHsl = isHsl;
exports.isHsla = isHsla;
exports.isAnyHsl = isAnyHsl;
exports.isAlpha = isAlpha;
exports.toRgb = toRgb;
exports.toRgba = toRgba;
exports.toAnyRgb = toAnyRgb;
exports.toHsl = toHsl;
exports.toHsla = toHsla;
exports.toAnyHsl = toAnyHsl;
exports.toAnyAlpha = toAnyAlpha;
exports.toAnyOpaque = toAnyOpaque;
exports.getRed = getRed;
exports.withRed = withRed;
exports.getGreen = getGreen;
exports.withGreen = withGreen;
exports.getBlue = getBlue;
exports.withBlue = withBlue;
exports.getHue = getHue;
exports.withHue = withHue;
exports.getSaturation = getSaturation;
exports.withSaturation = withSaturation;
exports.getLightness = getLightness;
exports.withLightness = withLightness;
exports.getOpacity = getOpacity;
exports.withOpacity = withOpacity;
exports.invert = invert;
exports.grayscale = grayscale;
exports.complement = complement;
exports.lighten = lighten;
exports.darken = darken;
exports.tint = tint;
exports.tone = tone;
exports.fadeIn = fadeIn;
exports.fadeOut = fadeOut;
exports.toString = toString;
exports.Color = void 0;

var _common = require("./common");

var _converters = require("./converters");

var _expressions = require("./expressions");

var _mixers = require("./mixers");

var _schemes = require("./schemes");

var _spaces = require("./spaces");

/**
 * Color contains basic information of a color.
 *
 * It will store the space the color is currently in and the channel values
 * for that color space.
 *
 * Examples:
 * - For a RGB color it will look like
 *   ```
 *   Color {
 *       space: ColorSpace.RGB,
 *       data: [r, g, b],
 *   }
 *   ```
 * - For a HSLA color it will look like
 *   ```
 *   Color {
 *       space: ColorSpace.HSLA,
 *       data: [h, s, l, a],
 *   }
 *   ```
 */
class Color {
  static airForceBlueRaf = Color.rgb(93, 138, 168);
  static airForceBlueUsaf = Color.rgb(0, 48, 143);
  static airSuperiorityBlue = Color.rgb(114, 160, 193);
  static alabamaCrimson = Color.rgb(163, 38, 56);
  static aliceBlue = Color.rgb(240, 248, 255);
  static alizarinCrimson = Color.rgb(227, 38, 54);
  static alloyOrange = Color.rgb(196, 98, 16);
  static almond = Color.rgb(239, 222, 205);
  static amaranth = Color.rgb(229, 43, 80);
  static amber = Color.rgb(255, 191, 0);
  static amberSaeEce = Color.rgb(255, 126, 0);
  static americanRose = Color.rgb(255, 3, 62);
  static amethyst = Color.rgb(153, 102, 204);
  static androidGreen = Color.rgb(164, 198, 57);
  static antiFlashWhite = Color.rgb(242, 243, 244);
  static antiqueBrass = Color.rgb(205, 149, 117);
  static antiqueFuchsia = Color.rgb(145, 92, 131);
  static antiqueRuby = Color.rgb(132, 27, 45);
  static antiqueWhite = Color.rgb(250, 235, 215);
  static aoEnglish = Color.rgb(0, 128, 0);
  static appleGreen = Color.rgb(141, 182, 0);
  static apricot = Color.rgb(251, 206, 177);
  static aqua = Color.rgb(0, 255, 255);
  static aquamarine = Color.rgb(127, 255, 212);
  static armyGreen = Color.rgb(75, 83, 32);
  static arsenic = Color.rgb(59, 68, 75);
  static arylideYellow = Color.rgb(233, 214, 107);
  static ashGrey = Color.rgb(178, 190, 181);
  static asparagus = Color.rgb(135, 169, 107);
  static atomicTangerine = Color.rgb(255, 153, 102);
  static auburn = Color.rgb(165, 42, 42);
  static aureolin = Color.rgb(253, 238, 0);
  static aurometalsaurus = Color.rgb(110, 127, 128);
  static avocado = Color.rgb(86, 130, 3);
  static azure = Color.rgb(0, 127, 255);
  static azureMistWeb = Color.rgb(240, 255, 255);
  static babyBlue = Color.rgb(137, 207, 240);
  static babyBlueEyes = Color.rgb(161, 202, 241);
  static babyPink = Color.rgb(244, 194, 194);
  static ballBlue = Color.rgb(33, 171, 205);
  static bananaMania = Color.rgb(250, 231, 181);
  static bananaYellow = Color.rgb(255, 225, 53);
  static barnRed = Color.rgb(124, 10, 2);
  static battleshipGrey = Color.rgb(132, 132, 130);
  static bazaar = Color.rgb(152, 119, 123);
  static beauBlue = Color.rgb(188, 212, 230);
  static beaver = Color.rgb(159, 129, 112);
  static beige = Color.rgb(245, 245, 220);
  static bigDipORuby = Color.rgb(156, 37, 66);
  static bisque = Color.rgb(255, 228, 196);
  static bistre = Color.rgb(61, 43, 31);
  static bittersweet = Color.rgb(254, 111, 94);
  static bittersweetShimmer = Color.rgb(191, 79, 81);
  static black = Color.rgb(0, 0, 0);
  static blackBean = Color.rgb(61, 12, 2);
  static blackLeatherJacket = Color.rgb(37, 53, 41);
  static blackOlive = Color.rgb(59, 60, 54);
  static blanchedAlmond = Color.rgb(255, 235, 205);
  static blastOffBronze = Color.rgb(165, 113, 100);
  static bleuDeFrance = Color.rgb(49, 140, 231);
  static blizzardBlue = Color.rgb(172, 229, 238);
  static blond = Color.rgb(250, 240, 190);
  static blue = Color.rgb(0, 0, 255);
  static blueBell = Color.rgb(162, 162, 208);
  static blueCrayola = Color.rgb(31, 117, 254);
  static blueGray = Color.rgb(102, 153, 204);
  static blueGreen = Color.rgb(13, 152, 186);
  static blueMunsell = Color.rgb(0, 147, 175);
  static blueNcs = Color.rgb(0, 135, 189);
  static bluePigment = Color.rgb(51, 51, 153);
  static blueRyb = Color.rgb(2, 71, 254);
  static blueSapphire = Color.rgb(18, 97, 128);
  static blueViolet = Color.rgb(138, 43, 226);
  static blush = Color.rgb(222, 93, 131);
  static bole = Color.rgb(121, 68, 59);
  static bondiBlue = Color.rgb(0, 149, 182);
  static bone = Color.rgb(227, 218, 201);
  static bostonUniversityRed = Color.rgb(204, 0, 0);
  static bottleGreen = Color.rgb(0, 106, 78);
  static boysenberry = Color.rgb(135, 50, 96);
  static brandeisBlue = Color.rgb(0, 112, 255);
  static brass = Color.rgb(181, 166, 66);
  static brickRed = Color.rgb(203, 65, 84);
  static brightCerulean = Color.rgb(29, 172, 214);
  static brightGreen = Color.rgb(102, 255, 0);
  static brightLavender = Color.rgb(191, 148, 228);
  static brightMaroon = Color.rgb(195, 33, 72);
  static brightPink = Color.rgb(255, 0, 127);
  static brightTurquoise = Color.rgb(8, 232, 222);
  static brightUbe = Color.rgb(209, 159, 232);
  static brilliantLavender = Color.rgb(244, 187, 255);
  static brilliantRose = Color.rgb(255, 85, 163);
  static brinkPink = Color.rgb(251, 96, 127);
  static britishRacingGreen = Color.rgb(0, 66, 37);
  static bronze = Color.rgb(205, 127, 50);
  static brownTraditional = Color.rgb(150, 75, 0);
  static brownWeb = Color.rgb(165, 42, 42);
  static bubbleGum = Color.rgb(255, 193, 204);
  static bubbles = Color.rgb(231, 254, 255);
  static buff = Color.rgb(240, 220, 130);
  static bulgarianRose = Color.rgb(72, 6, 7);
  static burgundy = Color.rgb(128, 0, 32);
  static burlywood = Color.rgb(222, 184, 135);
  static burntOrange = Color.rgb(204, 85, 0);
  static burntSienna = Color.rgb(233, 116, 81);
  static burntUmber = Color.rgb(138, 51, 36);
  static byzantine = Color.rgb(189, 51, 164);
  static byzantium = Color.rgb(112, 41, 99);
  static cadet = Color.rgb(83, 104, 114);
  static cadetBlue = Color.rgb(95, 158, 160);
  static cadetGrey = Color.rgb(145, 163, 176);
  static cadmiumGreen = Color.rgb(0, 107, 60);
  static cadmiumOrange = Color.rgb(237, 135, 45);
  static cadmiumRed = Color.rgb(227, 0, 34);
  static cadmiumYellow = Color.rgb(255, 246, 0);
  static cafAuLait = Color.rgb(166, 123, 91);
  static cafNoir = Color.rgb(75, 54, 33);
  static calPolyGreen = Color.rgb(30, 77, 43);
  static cambridgeBlue = Color.rgb(163, 193, 173);
  static camel = Color.rgb(193, 154, 107);
  static cameoPink = Color.rgb(239, 187, 204);
  static camouflageGreen = Color.rgb(120, 134, 107);
  static canaryYellow = Color.rgb(255, 239, 0);
  static candyAppleRed = Color.rgb(255, 8, 0);
  static candyPink = Color.rgb(228, 113, 122);
  static capri = Color.rgb(0, 191, 255);
  static caputMortuum = Color.rgb(89, 39, 32);
  static cardinal = Color.rgb(196, 30, 58);
  static caribbeanGreen = Color.rgb(0, 204, 153);
  static carmine = Color.rgb(150, 0, 24);
  static carmineMP = Color.rgb(215, 0, 64);
  static carminePink = Color.rgb(235, 76, 66);
  static carmineRed = Color.rgb(255, 0, 56);
  static carnationPink = Color.rgb(255, 166, 201);
  static carnelian = Color.rgb(179, 27, 27);
  static carolinaBlue = Color.rgb(153, 186, 221);
  static carrotOrange = Color.rgb(237, 145, 33);
  static catalinaBlue = Color.rgb(6, 42, 120);
  static ceil = Color.rgb(146, 161, 207);
  static celadon = Color.rgb(172, 225, 175);
  static celadonBlue = Color.rgb(0, 123, 167);
  static celadonGreen = Color.rgb(47, 132, 124);
  static celesteColour = Color.rgb(178, 255, 255);
  static celestialBlue = Color.rgb(73, 151, 208);
  static cerise = Color.rgb(222, 49, 99);
  static cerisePink = Color.rgb(236, 59, 131);
  static cerulean = Color.rgb(0, 123, 167);
  static ceruleanBlue = Color.rgb(42, 82, 190);
  static ceruleanFrost = Color.rgb(109, 155, 195);
  static cgBlue = Color.rgb(0, 122, 165);
  static cgRed = Color.rgb(224, 60, 49);
  static chamoisee = Color.rgb(160, 120, 90);
  static champagne = Color.rgb(250, 214, 165);
  static charcoal = Color.rgb(54, 69, 79);
  static charmPink = Color.rgb(230, 143, 172);
  static chartreuseTraditional = Color.rgb(223, 255, 0);
  static chartreuseWeb = Color.rgb(127, 255, 0);
  static cherry = Color.rgb(222, 49, 99);
  static cherryBlossomPink = Color.rgb(255, 183, 197);
  static chestnut = Color.rgb(205, 92, 92);
  static chinaPink = Color.rgb(222, 111, 161);
  static chinaRose = Color.rgb(168, 81, 110);
  static chineseRed = Color.rgb(170, 56, 30);
  static chocolateTraditional = Color.rgb(123, 63, 0);
  static chocolateWeb = Color.rgb(210, 105, 30);
  static chromeYellow = Color.rgb(255, 167, 0);
  static cinereous = Color.rgb(152, 129, 123);
  static cinnabar = Color.rgb(227, 66, 52);
  static cinnamon = Color.rgb(210, 105, 30);
  static citrine = Color.rgb(228, 208, 10);
  static classicRose = Color.rgb(251, 204, 231);
  static cobalt = Color.rgb(0, 71, 171);
  static cocoaBrown = Color.rgb(210, 105, 30);
  static coffee = Color.rgb(111, 78, 55);
  static columbiaBlue = Color.rgb(155, 221, 255);
  static congoPink = Color.rgb(248, 131, 121);
  static coolBlack = Color.rgb(0, 46, 99);
  static coolGrey = Color.rgb(140, 146, 172);
  static copper = Color.rgb(184, 115, 51);
  static copperCrayola = Color.rgb(218, 138, 103);
  static copperPenny = Color.rgb(173, 111, 105);
  static copperRed = Color.rgb(203, 109, 81);
  static copperRose = Color.rgb(153, 102, 102);
  static coquelicot = Color.rgb(255, 56, 0);
  static coral = Color.rgb(255, 127, 80);
  static coralPink = Color.rgb(248, 131, 121);
  static coralRed = Color.rgb(255, 64, 64);
  static cordovan = Color.rgb(137, 63, 69);
  static corn = Color.rgb(251, 236, 93);
  static cornellRed = Color.rgb(179, 27, 27);
  static cornflowerBlue = Color.rgb(100, 149, 237);
  static cornsilk = Color.rgb(255, 248, 220);
  static cosmicLatte = Color.rgb(255, 248, 231);
  static cottonCandy = Color.rgb(255, 188, 217);
  static cream = Color.rgb(255, 253, 208);
  static crimson = Color.rgb(220, 20, 60);
  static crimsonGlory = Color.rgb(190, 0, 50);
  static cyan = Color.rgb(0, 255, 255);
  static cyanProcess = Color.rgb(0, 183, 235);
  static cyberYellow = Color.rgb(255, 211, 0);
  static daffodil = Color.rgb(255, 255, 49);
  static dandelion = Color.rgb(240, 225, 48);
  static darkBlue = Color.rgb(0, 0, 139);
  static darkBrown = Color.rgb(101, 67, 33);
  static darkByzantium = Color.rgb(93, 57, 84);
  static darkCandyAppleRed = Color.rgb(164, 0, 0);
  static darkCerulean = Color.rgb(8, 69, 126);
  static darkChestnut = Color.rgb(152, 105, 96);
  static darkCoral = Color.rgb(205, 91, 69);
  static darkCyan = Color.rgb(0, 139, 139);
  static darkElectricBlue = Color.rgb(83, 104, 120);
  static darkGoldenrod = Color.rgb(184, 134, 11);
  static darkGray = Color.rgb(169, 169, 169);
  static darkGreen = Color.rgb(1, 50, 32);
  static darkImperialBlue = Color.rgb(0, 65, 106);
  static darkJungleGreen = Color.rgb(26, 36, 33);
  static darkKhaki = Color.rgb(189, 183, 107);
  static darkLava = Color.rgb(72, 60, 50);
  static darkLavender = Color.rgb(115, 79, 150);
  static darkMagenta = Color.rgb(139, 0, 139);
  static darkMidnightBlue = Color.rgb(0, 51, 102);
  static darkOliveGreen = Color.rgb(85, 107, 47);
  static darkOrange = Color.rgb(255, 140, 0);
  static darkOrchid = Color.rgb(153, 50, 204);
  static darkPastelBlue = Color.rgb(119, 158, 203);
  static darkPastelGreen = Color.rgb(3, 192, 60);
  static darkPastelPurple = Color.rgb(150, 111, 214);
  static darkPastelRed = Color.rgb(194, 59, 34);
  static darkPink = Color.rgb(231, 84, 128);
  static darkPowderBlue = Color.rgb(0, 51, 153);
  static darkRaspberry = Color.rgb(135, 38, 87);
  static darkRed = Color.rgb(139, 0, 0);
  static darkSalmon = Color.rgb(233, 150, 122);
  static darkScarlet = Color.rgb(86, 3, 25);
  static darkSeaGreen = Color.rgb(143, 188, 143);
  static darkSienna = Color.rgb(60, 20, 20);
  static darkSlateBlue = Color.rgb(72, 61, 139);
  static darkSlateGray = Color.rgb(47, 79, 79);
  static darkSpringGreen = Color.rgb(23, 114, 69);
  static darkTan = Color.rgb(145, 129, 81);
  static darkTangerine = Color.rgb(255, 168, 18);
  static darkTaupe = Color.rgb(72, 60, 50);
  static darkTerraCotta = Color.rgb(204, 78, 92);
  static darkTurquoise = Color.rgb(0, 206, 209);
  static darkViolet = Color.rgb(148, 0, 211);
  static darkYellow = Color.rgb(155, 135, 12);
  static dartmouthGreen = Color.rgb(0, 112, 60);
  static davySGrey = Color.rgb(85, 85, 85);
  static debianRed = Color.rgb(215, 10, 83);
  static deepCarmine = Color.rgb(169, 32, 62);
  static deepCarminePink = Color.rgb(239, 48, 56);
  static deepCarrotOrange = Color.rgb(233, 105, 44);
  static deepCerise = Color.rgb(218, 50, 135);
  static deepChampagne = Color.rgb(250, 214, 165);
  static deepChestnut = Color.rgb(185, 78, 72);
  static deepCoffee = Color.rgb(112, 66, 65);
  static deepFuchsia = Color.rgb(193, 84, 193);
  static deepJungleGreen = Color.rgb(0, 75, 73);
  static deepLilac = Color.rgb(153, 85, 187);
  static deepMagenta = Color.rgb(204, 0, 204);
  static deepPeach = Color.rgb(255, 203, 164);
  static deepPink = Color.rgb(255, 20, 147);
  static deepRuby = Color.rgb(132, 63, 91);
  static deepSaffron = Color.rgb(255, 153, 51);
  static deepSkyBlue = Color.rgb(0, 191, 255);
  static deepTuscanRed = Color.rgb(102, 66, 77);
  static denim = Color.rgb(21, 96, 189);
  static desert = Color.rgb(193, 154, 107);
  static desertSand = Color.rgb(237, 201, 175);
  static dimGray = Color.rgb(105, 105, 105);
  static dodgerBlue = Color.rgb(30, 144, 255);
  static dogwoodRose = Color.rgb(215, 24, 104);
  static dollarBill = Color.rgb(133, 187, 101);
  static drab = Color.rgb(150, 113, 23);
  static dukeBlue = Color.rgb(0, 0, 156);
  static earthYellow = Color.rgb(225, 169, 95);
  static ebony = Color.rgb(85, 93, 80);
  static ecru = Color.rgb(194, 178, 128);
  static eggplant = Color.rgb(97, 64, 81);
  static eggshell = Color.rgb(240, 234, 214);
  static egyptianBlue = Color.rgb(16, 52, 166);
  static electricBlue = Color.rgb(125, 249, 255);
  static electricCrimson = Color.rgb(255, 0, 63);
  static electricCyan = Color.rgb(0, 255, 255);
  static electricGreen = Color.rgb(0, 255, 0);
  static electricIndigo = Color.rgb(111, 0, 255);
  static electricLavender = Color.rgb(244, 187, 255);
  static electricLime = Color.rgb(204, 255, 0);
  static electricPurple = Color.rgb(191, 0, 255);
  static electricUltramarine = Color.rgb(63, 0, 255);
  static electricViolet = Color.rgb(143, 0, 255);
  static electricYellow = Color.rgb(255, 255, 0);
  static emerald = Color.rgb(80, 200, 120);
  static englishLavender = Color.rgb(180, 131, 149);
  static etonBlue = Color.rgb(150, 200, 162);
  static fallow = Color.rgb(193, 154, 107);
  static faluRed = Color.rgb(128, 24, 24);
  static fandango = Color.rgb(181, 51, 137);
  static fashionFuchsia = Color.rgb(244, 0, 161);
  static fawn = Color.rgb(229, 170, 112);
  static feldgrau = Color.rgb(77, 93, 83);
  static fernGreen = Color.rgb(79, 121, 66);
  static ferrariRed = Color.rgb(255, 40, 0);
  static fieldDrab = Color.rgb(108, 84, 30);
  static fireEngineRed = Color.rgb(206, 32, 41);
  static firebrick = Color.rgb(178, 34, 34);
  static flame = Color.rgb(226, 88, 34);
  static flamingoPink = Color.rgb(252, 142, 172);
  static flavescent = Color.rgb(247, 233, 142);
  static flax = Color.rgb(238, 220, 130);
  static floralWhite = Color.rgb(255, 250, 240);
  static fluorescentOrange = Color.rgb(255, 191, 0);
  static fluorescentPink = Color.rgb(255, 20, 147);
  static fluorescentYellow = Color.rgb(204, 255, 0);
  static folly = Color.rgb(255, 0, 79);
  static forestGreenTraditional = Color.rgb(1, 68, 33);
  static forestGreenWeb = Color.rgb(34, 139, 34);
  static frenchBeige = Color.rgb(166, 123, 91);
  static frenchBlue = Color.rgb(0, 114, 187);
  static frenchLilac = Color.rgb(134, 96, 142);
  static frenchLime = Color.rgb(204, 255, 0);
  static frenchRaspberry = Color.rgb(199, 44, 72);
  static frenchRose = Color.rgb(246, 74, 138);
  static fuchsia = Color.rgb(255, 0, 255);
  static fuchsiaCrayola = Color.rgb(193, 84, 193);
  static fuchsiaPink = Color.rgb(255, 119, 255);
  static fuchsiaRose = Color.rgb(199, 67, 117);
  static fulvous = Color.rgb(228, 132, 0);
  static fuzzyWuzzy = Color.rgb(204, 102, 102);
  static gainsboro = Color.rgb(220, 220, 220);
  static gamboge = Color.rgb(228, 155, 15);
  static ghostWhite = Color.rgb(248, 248, 255);
  static ginger = Color.rgb(176, 101, 0);
  static glaucous = Color.rgb(96, 130, 182);
  static glitter = Color.rgb(230, 232, 250);
  static goldMetallic = Color.rgb(212, 175, 55);
  static goldWebGolden = Color.rgb(255, 215, 0);
  static goldenBrown = Color.rgb(153, 101, 21);
  static goldenPoppy = Color.rgb(252, 194, 0);
  static goldenYellow = Color.rgb(255, 223, 0);
  static goldenrod = Color.rgb(218, 165, 32);
  static grannySmithApple = Color.rgb(168, 228, 160);
  static gray = Color.rgb(128, 128, 128);
  static grayAsparagus = Color.rgb(70, 89, 69);
  static grayHtmlCssGray = Color.rgb(128, 128, 128);
  static grayX11Gray = Color.rgb(190, 190, 190);
  static greenColorWheelX11Green = Color.rgb(0, 255, 0);
  static greenCrayola = Color.rgb(28, 172, 120);
  static greenHtmlCssGreen = Color.rgb(0, 128, 0);
  static greenMunsell = Color.rgb(0, 168, 119);
  static greenNcs = Color.rgb(0, 159, 107);
  static greenPigment = Color.rgb(0, 165, 80);
  static greenRyb = Color.rgb(102, 176, 50);
  static greenYellow = Color.rgb(173, 255, 47);
  static grullo = Color.rgb(169, 154, 134);
  static guppieGreen = Color.rgb(0, 255, 127);
  static halayBe = Color.rgb(102, 56, 84);
  static hanBlue = Color.rgb(68, 108, 207);
  static hanPurple = Color.rgb(82, 24, 250);
  static hansaYellow = Color.rgb(233, 214, 107);
  static harlequin = Color.rgb(63, 255, 0);
  static harvardCrimson = Color.rgb(201, 0, 22);
  static harvestGold = Color.rgb(218, 145, 0);
  static heartGold = Color.rgb(128, 128, 0);
  static heliotrope = Color.rgb(223, 115, 255);
  static hollywoodCerise = Color.rgb(244, 0, 161);
  static honeydew = Color.rgb(240, 255, 240);
  static honoluluBlue = Color.rgb(0, 127, 191);
  static hookerSGreen = Color.rgb(73, 121, 107);
  static hotMagenta = Color.rgb(255, 29, 206);
  static hotPink = Color.rgb(255, 105, 180);
  static hunterGreen = Color.rgb(53, 94, 59);
  static iceberg = Color.rgb(113, 166, 210);
  static icterine = Color.rgb(252, 247, 94);
  static imperialBlue = Color.rgb(0, 35, 149);
  static inchworm = Color.rgb(178, 236, 93);
  static indiaGreen = Color.rgb(19, 136, 8);
  static indianRed = Color.rgb(205, 92, 92);
  static indianYellow = Color.rgb(227, 168, 87);
  static indigo = Color.rgb(111, 0, 255);
  static indigoDye = Color.rgb(0, 65, 106);
  static indigoWeb = Color.rgb(75, 0, 130);
  static internationalKleinBlue = Color.rgb(0, 47, 167);
  static internationalOrangeAerospace = Color.rgb(255, 79, 0);
  static internationalOrangeEngineering = Color.rgb(186, 22, 12);
  static internationalOrangeGoldenGateBridge = Color.rgb(192, 54, 44);
  static iris = Color.rgb(90, 79, 207);
  static isabelline = Color.rgb(244, 240, 236);
  static islamicGreen = Color.rgb(0, 144, 0);
  static ivory = Color.rgb(255, 255, 240);
  static jade = Color.rgb(0, 168, 107);
  static jasmine = Color.rgb(248, 222, 126);
  static jasper = Color.rgb(215, 59, 62);
  static jazzberryJam = Color.rgb(165, 11, 94);
  static jet = Color.rgb(52, 52, 52);
  static jonquil = Color.rgb(250, 218, 94);
  static juneBud = Color.rgb(189, 218, 87);
  static jungleGreen = Color.rgb(41, 171, 135);
  static kellyGreen = Color.rgb(76, 187, 23);
  static kenyanCopper = Color.rgb(124, 28, 5);
  static khakiHtmlCssKhaki = Color.rgb(195, 176, 145);
  static khakiX11LightKhaki = Color.rgb(240, 230, 140);
  static kuCrimson = Color.rgb(232, 0, 13);
  static laSalleGreen = Color.rgb(8, 120, 48);
  static languidLavender = Color.rgb(214, 202, 221);
  static lapisLazuli = Color.rgb(38, 97, 156);
  static laserLemon = Color.rgb(254, 254, 34);
  static laurelGreen = Color.rgb(169, 186, 157);
  static lava = Color.rgb(207, 16, 32);
  static lavenderBlue = Color.rgb(204, 204, 255);
  static lavenderBlush = Color.rgb(255, 240, 245);
  static lavenderFloral = Color.rgb(181, 126, 220);
  static lavenderGray = Color.rgb(196, 195, 208);
  static lavenderIndigo = Color.rgb(148, 87, 235);
  static lavenderMagenta = Color.rgb(238, 130, 238);
  static lavenderMist = Color.rgb(230, 230, 250);
  static lavenderPink = Color.rgb(251, 174, 210);
  static lavenderPurple = Color.rgb(150, 123, 182);
  static lavenderRose = Color.rgb(251, 160, 227);
  static lavenderWeb = Color.rgb(230, 230, 250);
  static lawnGreen = Color.rgb(124, 252, 0);
  static lemon = Color.rgb(255, 247, 0);
  static lemonChiffon = Color.rgb(255, 250, 205);
  static lemonLime = Color.rgb(227, 255, 0);
  static licorice = Color.rgb(26, 17, 16);
  static lightApricot = Color.rgb(253, 213, 177);
  static lightBlue = Color.rgb(173, 216, 230);
  static lightBrown = Color.rgb(181, 101, 29);
  static lightCarminePink = Color.rgb(230, 103, 113);
  static lightCoral = Color.rgb(240, 128, 128);
  static lightCornflowerBlue = Color.rgb(147, 204, 234);
  static lightCrimson = Color.rgb(245, 105, 145);
  static lightCyan = Color.rgb(224, 255, 255);
  static lightFuchsiaPink = Color.rgb(249, 132, 239);
  static lightGoldenrodYellow = Color.rgb(250, 250, 210);
  static lightGray = Color.rgb(211, 211, 211);
  static lightGreen = Color.rgb(144, 238, 144);
  static lightKhaki = Color.rgb(240, 230, 140);
  static lightPastelPurple = Color.rgb(177, 156, 217);
  static lightPink = Color.rgb(255, 182, 193);
  static lightRedOchre = Color.rgb(233, 116, 81);
  static lightSalmon = Color.rgb(255, 160, 122);
  static lightSalmonPink = Color.rgb(255, 153, 153);
  static lightSeaGreen = Color.rgb(32, 178, 170);
  static lightSkyBlue = Color.rgb(135, 206, 250);
  static lightSlateGray = Color.rgb(119, 136, 153);
  static lightTaupe = Color.rgb(179, 139, 109);
  static lightThulianPink = Color.rgb(230, 143, 172);
  static lightYellow = Color.rgb(255, 255, 224);
  static lilac = Color.rgb(200, 162, 200);
  static limeColorWheel = Color.rgb(191, 255, 0);
  static limeGreen = Color.rgb(50, 205, 50);
  static limeWebX11Green = Color.rgb(0, 255, 0);
  static limerick = Color.rgb(157, 194, 9);
  static lincolnGreen = Color.rgb(25, 89, 5);
  static linen = Color.rgb(250, 240, 230);
  static lion = Color.rgb(193, 154, 107);
  static littleBoyBlue = Color.rgb(108, 160, 220);
  static liver = Color.rgb(83, 75, 79);
  static lust = Color.rgb(230, 32, 32);
  static magenta = Color.rgb(255, 0, 255);
  static magentaDye = Color.rgb(202, 31, 123);
  static magentaProcess = Color.rgb(255, 0, 144);
  static magicMint = Color.rgb(170, 240, 209);
  static magnolia = Color.rgb(248, 244, 255);
  static mahogany = Color.rgb(192, 64, 0);
  static maize = Color.rgb(251, 236, 93);
  static majorelleBlue = Color.rgb(96, 80, 220);
  static malachite = Color.rgb(11, 218, 81);
  static manatee = Color.rgb(151, 154, 170);
  static mangoTango = Color.rgb(255, 130, 67);
  static mantis = Color.rgb(116, 195, 101);
  static mardiGras = Color.rgb(136, 0, 133);
  static maroonCrayola = Color.rgb(195, 33, 72);
  static maroonHtmlCss = Color.rgb(128, 0, 0);
  static maroonX11 = Color.rgb(176, 48, 96);
  static mauve = Color.rgb(224, 176, 255);
  static mauveTaupe = Color.rgb(145, 95, 109);
  static mauvelous = Color.rgb(239, 152, 170);
  static mayaBlue = Color.rgb(115, 194, 251);
  static meatBrown = Color.rgb(229, 183, 59);
  static mediumAquamarine = Color.rgb(102, 221, 170);
  static mediumBlue = Color.rgb(0, 0, 205);
  static mediumCandyAppleRed = Color.rgb(226, 6, 44);
  static mediumCarmine = Color.rgb(175, 64, 53);
  static mediumChampagne = Color.rgb(243, 229, 171);
  static mediumElectricBlue = Color.rgb(3, 80, 150);
  static mediumJungleGreen = Color.rgb(28, 53, 45);
  static mediumLavenderMagenta = Color.rgb(221, 160, 221);
  static mediumOrchid = Color.rgb(186, 85, 211);
  static mediumPersianBlue = Color.rgb(0, 103, 165);
  static mediumPurple = Color.rgb(147, 112, 219);
  static mediumRedViolet = Color.rgb(187, 51, 133);
  static mediumRuby = Color.rgb(170, 64, 105);
  static mediumSeaGreen = Color.rgb(60, 179, 113);
  static mediumSlateBlue = Color.rgb(123, 104, 238);
  static mediumSpringBud = Color.rgb(201, 220, 135);
  static mediumSpringGreen = Color.rgb(0, 250, 154);
  static mediumTaupe = Color.rgb(103, 76, 71);
  static mediumTurquoise = Color.rgb(72, 209, 204);
  static mediumTuscanRed = Color.rgb(121, 68, 59);
  static mediumVermilion = Color.rgb(217, 96, 59);
  static mediumVioletRed = Color.rgb(199, 21, 133);
  static mellowApricot = Color.rgb(248, 184, 120);
  static mellowYellow = Color.rgb(248, 222, 126);
  static melon = Color.rgb(253, 188, 180);
  static midnightBlue = Color.rgb(25, 25, 112);
  static midnightGreenEagleGreen = Color.rgb(0, 73, 83);
  static mikadoYellow = Color.rgb(255, 196, 12);
  static mint = Color.rgb(62, 180, 137);
  static mintCream = Color.rgb(245, 255, 250);
  static mintGreen = Color.rgb(152, 255, 152);
  static mistyRose = Color.rgb(255, 228, 225);
  static moccasin = Color.rgb(250, 235, 215);
  static modeBeige = Color.rgb(150, 113, 23);
  static moonstoneBlue = Color.rgb(115, 169, 194);
  static mordantRed19 = Color.rgb(174, 12, 0);
  static mossGreen = Color.rgb(173, 223, 173);
  static mountainMeadow = Color.rgb(48, 186, 143);
  static mountbattenPink = Color.rgb(153, 122, 141);
  static msuGreen = Color.rgb(24, 69, 59);
  static mulberry = Color.rgb(197, 75, 140);
  static mustard = Color.rgb(255, 219, 88);
  static myrtle = Color.rgb(33, 66, 30);
  static nadeshikoPink = Color.rgb(246, 173, 198);
  static napierGreen = Color.rgb(42, 128, 0);
  static naplesYellow = Color.rgb(250, 218, 94);
  static navajoWhite = Color.rgb(255, 222, 173);
  static navyBlue = Color.rgb(0, 0, 128);
  static neonCarrot = Color.rgb(255, 163, 67);
  static neonFuchsia = Color.rgb(254, 65, 100);
  static neonGreen = Color.rgb(57, 255, 20);
  static newYorkPink = Color.rgb(215, 131, 127);
  static nonPhotoBlue = Color.rgb(164, 221, 237);
  static northTexasGreen = Color.rgb(5, 144, 51);
  static oceanBoatBlue = Color.rgb(0, 119, 190);
  static ochre = Color.rgb(204, 119, 34);
  static officeGreen = Color.rgb(0, 128, 0);
  static oldGold = Color.rgb(207, 181, 59);
  static oldLace = Color.rgb(253, 245, 230);
  static oldLavender = Color.rgb(121, 104, 120);
  static oldMauve = Color.rgb(103, 49, 71);
  static oldRose = Color.rgb(192, 128, 129);
  static olive = Color.rgb(128, 128, 0);
  static oliveDrab7 = Color.rgb(60, 52, 31);
  static oliveDrabWebOliveDrab3 = Color.rgb(107, 142, 35);
  static olivine = Color.rgb(154, 185, 115);
  static onyx = Color.rgb(53, 56, 57);
  static operaMauve = Color.rgb(183, 132, 167);
  static orangeColorWheel = Color.rgb(255, 127, 0);
  static orangePeel = Color.rgb(255, 159, 0);
  static orangeRed = Color.rgb(255, 69, 0);
  static orangeRyb = Color.rgb(251, 153, 2);
  static orangeWebColor = Color.rgb(255, 165, 0);
  static orchid = Color.rgb(218, 112, 214);
  static otterBrown = Color.rgb(101, 67, 33);
  static ouCrimsonRed = Color.rgb(153, 0, 0);
  static outerSpace = Color.rgb(65, 74, 76);
  static outrageousOrange = Color.rgb(255, 110, 74);
  static oxfordBlue = Color.rgb(0, 33, 71);
  static pakistanGreen = Color.rgb(0, 102, 0);
  static palatinateBlue = Color.rgb(39, 59, 226);
  static palatinatePurple = Color.rgb(104, 40, 96);
  static paleAqua = Color.rgb(188, 212, 230);
  static paleBlue = Color.rgb(175, 238, 238);
  static paleBrown = Color.rgb(152, 118, 84);
  static paleCarmine = Color.rgb(175, 64, 53);
  static paleCerulean = Color.rgb(155, 196, 226);
  static paleChestnut = Color.rgb(221, 173, 175);
  static paleCopper = Color.rgb(218, 138, 103);
  static paleCornflowerBlue = Color.rgb(171, 205, 239);
  static paleGold = Color.rgb(230, 190, 138);
  static paleGoldenrod = Color.rgb(238, 232, 170);
  static paleGreen = Color.rgb(152, 251, 152);
  static paleLavender = Color.rgb(220, 208, 255);
  static paleMagenta = Color.rgb(249, 132, 229);
  static palePink = Color.rgb(250, 218, 221);
  static palePlum = Color.rgb(221, 160, 221);
  static paleRedViolet = Color.rgb(219, 112, 147);
  static paleRobinEggBlue = Color.rgb(150, 222, 209);
  static paleSilver = Color.rgb(201, 192, 187);
  static paleSpringBud = Color.rgb(236, 235, 189);
  static paleTaupe = Color.rgb(188, 152, 126);
  static paleVioletRed = Color.rgb(219, 112, 147);
  static pansyPurple = Color.rgb(120, 24, 74);
  static papayaWhip = Color.rgb(255, 239, 213);
  static parisGreen = Color.rgb(80, 200, 120);
  static pastelBlue = Color.rgb(174, 198, 207);
  static pastelBrown = Color.rgb(131, 105, 83);
  static pastelGray = Color.rgb(207, 207, 196);
  static pastelGreen = Color.rgb(119, 221, 119);
  static pastelMagenta = Color.rgb(244, 154, 194);
  static pastelOrange = Color.rgb(255, 179, 71);
  static pastelPink = Color.rgb(222, 165, 164);
  static pastelPurple = Color.rgb(179, 158, 181);
  static pastelRed = Color.rgb(255, 105, 97);
  static pastelViolet = Color.rgb(203, 153, 201);
  static pastelYellow = Color.rgb(253, 253, 150);
  static patriarch = Color.rgb(128, 0, 128);
  static payneSGrey = Color.rgb(83, 104, 120);
  static peach = Color.rgb(255, 229, 180);
  static peachCrayola = Color.rgb(255, 203, 164);
  static peachOrange = Color.rgb(255, 204, 153);
  static peachPuff = Color.rgb(255, 218, 185);
  static peachYellow = Color.rgb(250, 223, 173);
  static pear = Color.rgb(209, 226, 49);
  static pearl = Color.rgb(234, 224, 200);
  static pearlAqua = Color.rgb(136, 216, 192);
  static pearlyPurple = Color.rgb(183, 104, 162);
  static peridot = Color.rgb(230, 226, 0);
  static periwinkle = Color.rgb(204, 204, 255);
  static persianBlue = Color.rgb(28, 57, 187);
  static persianGreen = Color.rgb(0, 166, 147);
  static persianIndigo = Color.rgb(50, 18, 122);
  static persianOrange = Color.rgb(217, 144, 88);
  static persianPink = Color.rgb(247, 127, 190);
  static persianPlum = Color.rgb(112, 28, 28);
  static persianRed = Color.rgb(204, 51, 51);
  static persianRose = Color.rgb(254, 40, 162);
  static persimmon = Color.rgb(236, 88, 0);
  static peru = Color.rgb(205, 133, 63);
  static phlox = Color.rgb(223, 0, 255);
  static phthaloBlue = Color.rgb(0, 15, 137);
  static phthaloGreen = Color.rgb(18, 53, 36);
  static piggyPink = Color.rgb(253, 221, 230);
  static pineGreen = Color.rgb(1, 121, 111);
  static pink = Color.rgb(255, 192, 203);
  static pinkLace = Color.rgb(255, 221, 244);
  static pinkOrange = Color.rgb(255, 153, 102);
  static pinkPearl = Color.rgb(231, 172, 207);
  static pinkSherbet = Color.rgb(247, 143, 167);
  static pistachio = Color.rgb(147, 197, 114);
  static platinum = Color.rgb(229, 228, 226);
  static plumTraditional = Color.rgb(142, 69, 133);
  static plumWeb = Color.rgb(221, 160, 221);
  static portlandOrange = Color.rgb(255, 90, 54);
  static powderBlueWeb = Color.rgb(176, 224, 230);
  static princetonOrange = Color.rgb(255, 143, 0);
  static prune = Color.rgb(112, 28, 28);
  static prussianBlue = Color.rgb(0, 49, 83);
  static psychedelicPurple = Color.rgb(223, 0, 255);
  static puce = Color.rgb(204, 136, 153);
  static pumpkin = Color.rgb(255, 117, 24);
  static purpleHeart = Color.rgb(105, 53, 156);
  static purpleHtmlCss = Color.rgb(128, 0, 128);
  static purpleMountainMajesty = Color.rgb(150, 120, 182);
  static purpleMunsell = Color.rgb(159, 0, 197);
  static purplePizzazz = Color.rgb(254, 78, 218);
  static purpleTaupe = Color.rgb(80, 64, 77);
  static purpleX11 = Color.rgb(160, 32, 240);
  static quartz = Color.rgb(81, 72, 79);
  static rackley = Color.rgb(93, 138, 168);
  static radicalRed = Color.rgb(255, 53, 94);
  static rajah = Color.rgb(251, 171, 96);
  static raspberry = Color.rgb(227, 11, 93);
  static raspberryGlace = Color.rgb(145, 95, 109);
  static raspberryPink = Color.rgb(226, 80, 152);
  static raspberryRose = Color.rgb(179, 68, 108);
  static rawUmber = Color.rgb(130, 102, 68);
  static razzleDazzleRose = Color.rgb(255, 51, 204);
  static razzmatazz = Color.rgb(227, 37, 107);
  static red = Color.rgb(255, 0, 0);
  static redBrown = Color.rgb(165, 42, 42);
  static redDevil = Color.rgb(134, 1, 17);
  static redMunsell = Color.rgb(242, 0, 60);
  static redNcs = Color.rgb(196, 2, 51);
  static redOrange = Color.rgb(255, 83, 73);
  static redPigment = Color.rgb(237, 28, 36);
  static redRyb = Color.rgb(254, 39, 18);
  static redViolet = Color.rgb(199, 21, 133);
  static redwood = Color.rgb(171, 78, 82);
  static regalia = Color.rgb(82, 45, 128);
  static resolutionBlue = Color.rgb(0, 35, 135);
  static richBlack = Color.rgb(0, 64, 64);
  static richBrilliantLavender = Color.rgb(241, 167, 254);
  static richCarmine = Color.rgb(215, 0, 64);
  static richElectricBlue = Color.rgb(8, 146, 208);
  static richLavender = Color.rgb(167, 107, 207);
  static richLilac = Color.rgb(182, 102, 210);
  static richMaroon = Color.rgb(176, 48, 96);
  static rifleGreen = Color.rgb(65, 72, 51);
  static robinEggBlue = Color.rgb(0, 204, 204);
  static rose = Color.rgb(255, 0, 127);
  static roseBonbon = Color.rgb(249, 66, 158);
  static roseEbony = Color.rgb(103, 72, 70);
  static roseGold = Color.rgb(183, 110, 121);
  static roseMadder = Color.rgb(227, 38, 54);
  static rosePink = Color.rgb(255, 102, 204);
  static roseQuartz = Color.rgb(170, 152, 169);
  static roseTaupe = Color.rgb(144, 93, 93);
  static roseVale = Color.rgb(171, 78, 82);
  static rosewood = Color.rgb(101, 0, 11);
  static rossoCorsa = Color.rgb(212, 0, 0);
  static rosyBrown = Color.rgb(188, 143, 143);
  static royalAzure = Color.rgb(0, 56, 168);
  static royalBlueTraditional = Color.rgb(0, 35, 102);
  static royalBlueWeb = Color.rgb(65, 105, 225);
  static royalFuchsia = Color.rgb(202, 44, 146);
  static royalPurple = Color.rgb(120, 81, 169);
  static royalYellow = Color.rgb(250, 218, 94);
  static rubineRed = Color.rgb(209, 0, 86);
  static ruby = Color.rgb(224, 17, 95);
  static rubyRed = Color.rgb(155, 17, 30);
  static ruddy = Color.rgb(255, 0, 40);
  static ruddyBrown = Color.rgb(187, 101, 40);
  static ruddyPink = Color.rgb(225, 142, 150);
  static rufous = Color.rgb(168, 28, 7);
  static russet = Color.rgb(128, 70, 27);
  static rust = Color.rgb(183, 65, 14);
  static rustyRed = Color.rgb(218, 44, 67);
  static sacramentoStateGreen = Color.rgb(0, 86, 63);
  static saddleBrown = Color.rgb(139, 69, 19);
  static safetyOrangeBlazeOrange = Color.rgb(255, 103, 0);
  static saffron = Color.rgb(244, 196, 48);
  static salmon = Color.rgb(255, 140, 105);
  static salmonPink = Color.rgb(255, 145, 164);
  static sand = Color.rgb(194, 178, 128);
  static sandDune = Color.rgb(150, 113, 23);
  static sandstorm = Color.rgb(236, 213, 64);
  static sandyBrown = Color.rgb(244, 164, 96);
  static sandyTaupe = Color.rgb(150, 113, 23);
  static sangria = Color.rgb(146, 0, 10);
  static sapGreen = Color.rgb(80, 125, 42);
  static sapphire = Color.rgb(15, 82, 186);
  static sapphireBlue = Color.rgb(0, 103, 165);
  static satinSheenGold = Color.rgb(203, 161, 53);
  static scarlet = Color.rgb(255, 36, 0);
  static scarletCrayola = Color.rgb(253, 14, 53);
  static schoolBusYellow = Color.rgb(255, 216, 0);
  static screaminGreen = Color.rgb(118, 255, 122);
  static seaBlue = Color.rgb(0, 105, 148);
  static seaGreen = Color.rgb(46, 139, 87);
  static sealBrown = Color.rgb(50, 20, 20);
  static seashell = Color.rgb(255, 245, 238);
  static selectiveYellow = Color.rgb(255, 186, 0);
  static sepia = Color.rgb(112, 66, 20);
  static shadow = Color.rgb(138, 121, 93);
  static shamrockGreen = Color.rgb(0, 158, 96);
  static shockingPink = Color.rgb(252, 15, 192);
  static shockingPinkCrayola = Color.rgb(255, 111, 255);
  static sienna = Color.rgb(136, 45, 23);
  static silver = Color.rgb(192, 192, 192);
  static sinopia = Color.rgb(203, 65, 11);
  static skobeloff = Color.rgb(0, 116, 116);
  static skyBlue = Color.rgb(135, 206, 235);
  static skyMagenta = Color.rgb(207, 113, 175);
  static slateBlue = Color.rgb(106, 90, 205);
  static slateGray = Color.rgb(112, 128, 144);
  static smaltDarkPowderBlue = Color.rgb(0, 51, 153);
  static smokeyTopaz = Color.rgb(147, 61, 65);
  static smokyBlack = Color.rgb(16, 12, 8);
  static snow = Color.rgb(255, 250, 250);
  static spiroDiscoBall = Color.rgb(15, 192, 252);
  static springBud = Color.rgb(167, 252, 0);
  static springGreen = Color.rgb(0, 255, 127);
  static stPatrickSBlue = Color.rgb(35, 41, 122);
  static steelBlue = Color.rgb(70, 130, 180);
  static stilDeGrainYellow = Color.rgb(250, 218, 94);
  static stizza = Color.rgb(153, 0, 0);
  static stormcloud = Color.rgb(79, 102, 106);
  static straw = Color.rgb(228, 217, 111);
  static sunglow = Color.rgb(255, 204, 51);
  static sunset = Color.rgb(250, 214, 165);
  static tan = Color.rgb(210, 180, 140);
  static tangelo = Color.rgb(249, 77, 0);
  static tangerine = Color.rgb(242, 133, 0);
  static tangerineYellow = Color.rgb(255, 204, 0);
  static tangoPink = Color.rgb(228, 113, 122);
  static taupe = Color.rgb(72, 60, 50);
  static taupeGray = Color.rgb(139, 133, 137);
  static teaGreen = Color.rgb(208, 240, 192);
  static teaRoseOrange = Color.rgb(248, 131, 121);
  static teaRoseRose = Color.rgb(244, 194, 194);
  static teal = Color.rgb(0, 128, 128);
  static tealBlue = Color.rgb(54, 117, 136);
  static tealGreen = Color.rgb(0, 130, 127);
  static telemagenta = Color.rgb(207, 52, 118);
  static tennTawny = Color.rgb(205, 87, 0);
  static terraCotta = Color.rgb(226, 114, 91);
  static thistle = Color.rgb(216, 191, 216);
  static thulianPink = Color.rgb(222, 111, 161);
  static tickleMePink = Color.rgb(252, 137, 172);
  static tiffanyBlue = Color.rgb(10, 186, 181);
  static tigerSEye = Color.rgb(224, 141, 60);
  static timberwolf = Color.rgb(219, 215, 210);
  static titaniumYellow = Color.rgb(238, 230, 0);
  static tomato = Color.rgb(255, 99, 71);
  static toolbox = Color.rgb(116, 108, 192);
  static topaz = Color.rgb(255, 200, 124);
  static tractorRed = Color.rgb(253, 14, 53);
  static trolleyGrey = Color.rgb(128, 128, 128);
  static tropicalRainForest = Color.rgb(0, 117, 94);
  static trueBlue = Color.rgb(0, 115, 207);
  static tuftsBlue = Color.rgb(65, 125, 193);
  static tumbleweed = Color.rgb(222, 170, 136);
  static turkishRose = Color.rgb(181, 114, 129);
  static turquoise = Color.rgb(48, 213, 200);
  static turquoiseBlue = Color.rgb(0, 255, 239);
  static turquoiseGreen = Color.rgb(160, 214, 180);
  static tuscanRed = Color.rgb(124, 72, 72);
  static twilightLavender = Color.rgb(138, 73, 107);
  static tyrianPurple = Color.rgb(102, 2, 60);
  static uaBlue = Color.rgb(0, 51, 170);
  static uaRed = Color.rgb(217, 0, 76);
  static ube = Color.rgb(136, 120, 195);
  static uclaBlue = Color.rgb(83, 104, 149);
  static uclaGold = Color.rgb(255, 179, 0);
  static ufoGreen = Color.rgb(60, 208, 112);
  static ultraPink = Color.rgb(255, 111, 255);
  static ultramarine = Color.rgb(18, 10, 143);
  static ultramarineBlue = Color.rgb(65, 102, 245);
  static umber = Color.rgb(99, 81, 71);
  static unbleachedSilk = Color.rgb(255, 221, 202);
  static unitedNationsBlue = Color.rgb(91, 146, 229);
  static universityOfCaliforniaGold = Color.rgb(183, 135, 39);
  static unmellowYellow = Color.rgb(255, 255, 102);
  static upForestGreen = Color.rgb(1, 68, 33);
  static upMaroon = Color.rgb(123, 17, 19);
  static upsdellRed = Color.rgb(174, 32, 41);
  static urobilin = Color.rgb(225, 173, 33);
  static usafaBlue = Color.rgb(0, 79, 152);
  static uscCardinal = Color.rgb(153, 0, 0);
  static uscGold = Color.rgb(255, 204, 0);
  static utahCrimson = Color.rgb(211, 0, 63);
  static vanilla = Color.rgb(243, 229, 171);
  static vegasGold = Color.rgb(197, 179, 88);
  static venetianRed = Color.rgb(200, 8, 21);
  static verdigris = Color.rgb(67, 179, 174);
  static vermilionCinnabar = Color.rgb(227, 66, 52);
  static vermilionPlochere = Color.rgb(217, 96, 59);
  static veronica = Color.rgb(160, 32, 240);
  static violet = Color.rgb(143, 0, 255);
  static violetBlue = Color.rgb(50, 74, 178);
  static violetColorWheel = Color.rgb(127, 0, 255);
  static violetRyb = Color.rgb(134, 1, 175);
  static violetWeb = Color.rgb(238, 130, 238);
  static viridian = Color.rgb(64, 130, 109);
  static vividAuburn = Color.rgb(146, 39, 36);
  static vividBurgundy = Color.rgb(159, 29, 53);
  static vividCerise = Color.rgb(218, 29, 129);
  static vividTangerine = Color.rgb(255, 160, 137);
  static vividViolet = Color.rgb(159, 0, 255);
  static warmBlack = Color.rgb(0, 66, 66);
  static waterspout = Color.rgb(164, 244, 249);
  static wenge = Color.rgb(100, 84, 82);
  static wheat = Color.rgb(245, 222, 179);
  static white = Color.rgb(255, 255, 255);
  static whiteSmoke = Color.rgb(245, 245, 245);
  static wildBlueYonder = Color.rgb(162, 173, 208);
  static wildStrawberry = Color.rgb(255, 67, 164);
  static wildWatermelon = Color.rgb(252, 108, 133);
  static wine = Color.rgb(114, 47, 55);
  static wineDregs = Color.rgb(103, 49, 71);
  static wisteria = Color.rgb(201, 160, 220);
  static woodBrown = Color.rgb(193, 154, 107);
  static xanadu = Color.rgb(115, 134, 120);
  static yaleBlue = Color.rgb(15, 77, 146);
  static yellow = Color.rgb(255, 255, 0);
  static yellowGreen = Color.rgb(154, 205, 50);
  static yellowMunsell = Color.rgb(239, 204, 0);
  static yellowNcs = Color.rgb(255, 211, 0);
  static yellowOrange = Color.rgb(255, 174, 66);
  static yellowProcess = Color.rgb(255, 239, 0);
  static yellowRyb = Color.rgb(254, 254, 51);
  static zaffre = Color.rgb(0, 20, 168);
  static zinnwalditeBrown = Color.rgb(44, 22, 8);

  constructor(space, data) {
    this.space = space;
    this.data = data;
  }

  get red() {
    return getRed(this);
  }

  get green() {
    return getGreen(this);
  }

  get blue() {
    return getBlue(this);
  }

  get hue() {
    return getHue(this);
  }

  get saturation() {
    return getSaturation(this);
  }

  get lightness() {
    return getLightness(this);
  }

  get opacity() {
    return getOpacity(this);
  }

  get lightShades() {
    return this.createLightShades();
  }

  get darkShades() {
    return this.createDarkShades();
  }

  get shades() {
    return this.createShades();
  }

  get complements() {
    return (0, _schemes.createComplementaryScheme)(this);
  }

  get analogousComplements() {
    return (0, _schemes.createAnalogousComplementaryScheme)(this);
  }

  get splitComplements() {
    return (0, _schemes.createSplitComplementaryScheme)(this);
  }

  get triadicComplements() {
    return (0, _schemes.createTriadicComplementaryScheme)(this);
  }

  get squareComplements() {
    return (0, _schemes.createSquareComplementaryScheme)(this);
  }

  get tetradicComplements() {
    return (0, _schemes.createTetradicComplementaryScheme)(this);
  }

  isSpace(space) {
    return isSpace(this, space);
  }

  isRgb() {
    return isRgb(this);
  }

  isRgba() {
    return isRgba(this);
  }

  isAnyRgb() {
    return isAnyRgb(this);
  }

  isHsl() {
    return isHsl(this);
  }

  isHsla() {
    return isHsla(this);
  }

  isAnyHsl() {
    return isAnyHsl(this);
  }

  isAlpha() {
    return isAlpha(this);
  }

  toRgb() {
    return toRgb(this);
  }

  toRgba() {
    return toRgba(this);
  }

  toAnyRgb() {
    return toAnyRgb(this);
  }

  toHsl() {
    return toHsl(this);
  }

  toHsla() {
    return toHsla(this);
  }

  toAnyHsl() {
    return toAnyHsl(this);
  }

  toAnyAlpha() {
    return toAnyAlpha(this);
  }

  toAnyOpaque() {
    return toAnyOpaque(this);
  }

  withRed(value) {
    return withRed(this, value);
  }

  withGreen(value) {
    return withGreen(this, value);
  }

  withBlue(value) {
    return withBlue(this, value);
  }

  withHue(value) {
    return withHue(this, value);
  }

  withSaturation(value) {
    return withSaturation(this, value);
  }

  withLightness(value) {
    return withLightness(this, value);
  }

  withOpacity(value) {
    return withOpacity(this, value);
  }

  invert() {
    return invert(this);
  }

  grayscale() {
    return grayscale(this);
  }

  complement(value = 180) {
    return complement(this, value);
  }

  mix(color, mode = _mixers.MixMode.RGB_SUBTRACTIVE) {
    return (0, _mixers.mix)(this, color, mode);
  }

  lighten(value) {
    return lighten(this, value);
  }

  darken(value) {
    return darken(this, value);
  }

  tint(value) {
    return tint(this, value);
  }

  tone(value) {
    return tone(this, value);
  }

  fadeIn(value) {
    return fadeIn(this, value);
  }

  fadeOut(value) {
    return fadeOut(this, value);
  }

  createScheme(keys, generate, options) {
    return (0, _schemes.createScheme)(this, keys, generate, options);
  }

  createLightShades(options) {
    return (0, _schemes.createLightShadeScheme)(this, options);
  }

  createDarkShades(options) {
    return (0, _schemes.createDarkShadeScheme)(this, options);
  }

  createShades(options) {
    return (0, _schemes.createShadeScheme)(this, options);
  }

  toFunctionExpression() {
    return (0, _expressions.toFunctionExpression)(this);
  }

  toHexExpression() {
    return (0, _expressions.toHexExpression)(this);
  }

  toString() {
    return toString(this);
  }

  static create(space, data) {
    return new Color(space, data);
  }

  static rgb(r, g, b) {
    return Color.create(_spaces.ColorSpace.RGB, [r, g, b]);
  }

  static rgba(r, g, b, a) {
    return Color.create(_spaces.ColorSpace.RGBA, [r, g, b, a]);
  }

  static hsl(h, s, l) {
    return Color.create(_spaces.ColorSpace.HSL, [h, s, l]);
  }

  static hsla(h, s, l, a) {
    return Color.create(_spaces.ColorSpace.HSLA, [h, s, l, a]);
  }

  static parse(value) {
    return (0, _expressions.parse)(value);
  }

}
/**
 * Checks if a color is in the specified color space.
 *
 * @param {Color} color The color you want to check
 * @param {ColorSpace} space The color space you want to check for
 *
 * @returns {boolean}
 */


exports.Color = Color;

function isSpace(color, space) {
  return color.space === space;
}

function isRgb(color) {
  return isSpace(color, _spaces.ColorSpace.RGB);
}

function isRgba(color) {
  return isSpace(color, _spaces.ColorSpace.RGBA);
}

function isAnyRgb(color) {
  return isRgb(color) || isRgba(color);
}

function isHsl(color) {
  return isSpace(color, _spaces.ColorSpace.HSL);
}

function isHsla(color) {
  return isSpace(color, _spaces.ColorSpace.HSLA);
}

function isAnyHsl(color) {
  return isHsl(color) || isHsla(color);
}

function isAlpha(color) {
  return isRgba(color) || isHsla(color);
}

function toRgb(color) {
  return (0, _converters.toSpace)(color, _spaces.ColorSpace.RGB);
}

function toRgba(color) {
  return (0, _converters.toSpace)(color, _spaces.ColorSpace.RGBA);
}

function toAnyRgb(color) {
  return isAlpha(color) ? toRgba(color) : toRgb(color);
}

function toHsl(color) {
  return (0, _converters.toSpace)(color, _spaces.ColorSpace.HSL);
}

function toHsla(color) {
  return (0, _converters.toSpace)(color, _spaces.ColorSpace.HSLA);
}

function toAnyHsl(color) {
  return isAlpha(color) ? toHsla(color) : toHsl(color);
}

function toAnyAlpha(color) {
  if (isAnyHsl(color)) {
    return toHsla(color);
  }

  return toRgba(color);
}

function toAnyOpaque(color) {
  if (isAnyHsl(color)) {
    return toHsl(color);
  }

  return toRgb(color);
}

function getRed(color) {
  return toAnyRgb(color).data[0];
}

function withRed(color, value) {
  const [, g, b, a] = toAnyRgb(color).data;
  return a !== undefined ? Color.rgba(value, g, b, a) : Color.rgb(value, g, b);
}

function getGreen(color) {
  return toAnyRgb(color).data[1];
}

function withGreen(color, value) {
  const [r,, b, a] = toAnyRgb(color).data;
  return a !== undefined ? Color.rgba(r, value, b, a) : Color.rgb(r, value, b);
}

function getBlue(color) {
  return toAnyRgb(color).data[2];
}

function withBlue(color, value) {
  const [r, g,, a] = toAnyRgb(color).data;
  return a !== undefined ? Color.rgba(r, g, value, a) : Color.rgb(r, g, value);
}

function getHue(color) {
  return toAnyHsl(color).data[0];
}

function withHue(color, value) {
  const [, s, l, a] = toAnyHsl(color).data;
  return a !== undefined ? Color.hsla(value, s, l, a) : Color.hsl(value, s, l);
}

function getSaturation(color) {
  return toAnyHsl(color).data[1];
}

function withSaturation(color, value) {
  const [h,, l, a] = toAnyHsl(color).data;
  return a !== undefined ? Color.hsla(h, value, l, a) : Color.hsl(h, value, l);
}

function getLightness(color) {
  return toAnyHsl(color).data[2];
}

function withLightness(color, value) {
  const [h, s,, a] = toAnyHsl(color).data;
  return a !== undefined ? Color.hsla(h, s, value, a) : Color.hsl(h, s, value);
}

function getOpacity(color) {
  const {
    data
  } = toAnyAlpha(color);
  return data[data.length - 1];
}

function withOpacity(color, value) {
  const {
    space,
    data
  } = toAnyAlpha(color);
  return Color.create(space, [...data.slice(0, data.length - 1), value]);
}

function invert(color) {
  const [r, g, b, a] = toAnyRgb(color).data;
  const [rScale, gScale, bScale] = (0, _spaces.getSpaceScales)(_spaces.ColorSpace.RGB);
  return a !== undefined ? Color.rgba(rScale - r, gScale - g, bScale - b, a) : Color.rgb(rScale - r, gScale - g, bScale - b);
}

function grayscale(color) {
  return withSaturation(color, 0);
}

function complement(color, value = 180) {
  const hue = getHue(color);
  const [hScale] = (0, _spaces.getSpaceScales)(_spaces.ColorSpace.HSL);
  return withHue(color, (0, _common.rotateValue)(hue + value, hScale));
}

function lighten(color, value) {
  return withLightness(color, getLightness(color) + value);
}

function darken(color, value) {
  return withLightness(color, getLightness(color) - value);
}

function tint(color, value) {
  return withSaturation(color, getSaturation(color) + value);
}

function tone(color, value) {
  return withSaturation(color, getSaturation(color) - value);
}

function fadeIn(color, value) {
  return withOpacity(color, getOpacity(color) + value);
}

function fadeOut(color, value) {
  return withOpacity(color, getOpacity(color) - value);
}

function toString(color) {
  const rgbColor = toAnyRgb(color);
  return isAlpha(rgbColor) && getOpacity(rgbColor) < 1 ? (0, _expressions.toFunctionExpression)(rgbColor) : (0, _expressions.toHexExpression)(rgbColor);
}