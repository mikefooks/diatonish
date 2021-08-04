import { List, Map } from "immutable";

const keys = List.of("C_1", "Db_1", "D_1", "Eb_1", "E_1", "F_1", "Gb_1", "G_1", "Ab_1", "A_1", "Bb_1", "B_1",
		     "C_1", "Db_1", "D_1", "Eb_1", "E_1", "F_1", "Gb_1", "G_1", "Ab_1", "A_1", "Bb_1", "B_1",
		     "C_3");
		     

             const modes = Map({
    "Ionian" : List.of(2, 2, 1, 2, 2, 2, 1),
    "Dorian" : List.of(2, 1, 2, 2, 2, 1, 2),
    "Phrygian" : List.of(1, 2, 2, 2, 1, 2, 2),
    "Lydian" : List.of(2, 2, 2, 1, 2, 2, 1),
    "Mixolydian" : List.of(2, 2, 1, 2, 2, 1, 2),
    "Aeolian" : List.of(2, 1, 2, 2, 1, 2, 2),
    "Locrian" : List.of(1, 2, 2, 1, 2, 2, 2)
});

// Get the particular keys in a mode/scale.
function getKeys(mode) {
    let modeIntervals = modes.get(mode);
    let counter = 0;
    let idxs = modeIntervals.reduce(function (a, b) {
	    counter += b;
        return a.push(counter);
    }, List([ 0 ]));

    return idxs;
}

export default {
    keys,
    modes,
    getKeys
};