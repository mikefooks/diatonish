import { OrderedMap } from "immutable";

const xTranslations = OrderedMap({
  0: 0,
  2: 100,
  4: 200,
  5: 300,
  7: 400,
  9: 500,
  11: 600,
  1: 60,
  3: 160,
  6: 360,
  8: 460,
  10: 560
});

function xTranslate(keyId) {
  let key = keyId % 12;
  let octave = Math.floor(keyId / 12);

  return xTranslations.get(key) + (octave * 700);
}

export {
  xTranslations,
  xTranslate
};