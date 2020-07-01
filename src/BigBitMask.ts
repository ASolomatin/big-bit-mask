export class BigBitMask {

    private static readonly alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

    private static readonly reverse: { [key: string]: number } = {
        "A": 0x00, "B": 0x01, "C": 0x02, "D": 0x03, "E": 0x04, "F": 0x05, "G": 0x06, "H": 0x07, "I": 0x08, "J": 0x09, "K": 0x0A, "L": 0x0B, "M": 0x0C, "N": 0x0D, "O": 0x0E, "P": 0x0F,
        "Q": 0x10, "R": 0x11, "S": 0x12, "T": 0x13, "U": 0x14, "V": 0x15, "W": 0x16, "X": 0x17, "Y": 0x18, "Z": 0x19, "a": 0x1A, "b": 0x1B, "c": 0x1C, "d": 0x1D, "e": 0x1E, "f": 0x1F,
        "g": 0x20, "h": 0x21, "i": 0x22, "j": 0x23, "k": 0x24, "l": 0x25, "m": 0x26, "n": 0x27, "o": 0x28, "p": 0x29, "q": 0x2A, "r": 0x2B, "s": 0x2C, "t": 0x2D, "u": 0x2E, "v": 0x2F,
        "w": 0x30, "x": 0x31, "y": 0x32, "z": 0x33, "0": 0x34, "1": 0x35, "2": 0x36, "3": 0x37, "4": 0x38, "5": 0x39, "6": 0x3A, "7": 0x3B, "8": 0x3C, "9": 0x3D, "-": 0x3E, "_": 0x3F,
    };

    private readonly blocks: number[];

    public constructor(mask?: string) {
        if (mask === undefined) {
            this.blocks = [];
        } else if (typeof mask !== "string") {
            throw new Error("Argument exception: mask must be a string or undefined");
        } else {
            this.blocks = mask.split("").map((block) => {
                if (!(block in BigBitMask.reverse)) {
                    throw new Error(`Format exception: unsupported token "${block}"`);
                }
                return BigBitMask.reverse[block];
            });
        }
    }

    public get(bit: number): boolean {
        if (typeof (bit) !== "number") {
            throw new Error("Argument exception: bit must be a number");
        }
        if (bit < 0) {
            throw new Error("Argument exception: bit must be greater or equals to zero");
        }

        const block = Math.floor(bit / 6);

        return this.blocks.length <= block ? false : !!(this.blocks[block] >> (bit % 6) & 0x1);
    }

    public set(bit: number, newValue: boolean) {
        if (typeof (bit) !== "number") {
            throw new Error("Argument exception: bit must be a number");
        }
        if (bit < 0) {
            throw new Error("Argument exception: bit must be greater or equals to zero");
        }

        const block = Math.floor(bit / 6);
        bit %= 6;

        if (this.blocks.length <= block) {
            for (let i = this.blocks.length; i <= block; i++) {
                this.blocks[i] = 0;
            }
        }

        const currentBlock = this.blocks[block];
        const currentValue = !!(currentBlock >> bit && 0x1);
        this.blocks[block] = newValue ? currentBlock | 0x1 << bit : currentBlock & ~(0x1 << bit);

        return currentValue;
    }

    public toString(): string {
        return this.blocks.map((block) => BigBitMask.alpha[block]).join("").replace(/A+$/, "");
    }
}
