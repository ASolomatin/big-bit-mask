import { BigBitMask } from "BigBitMask";
import { expect, should } from "chai";

describe("BigBitMask tests", () => {
    it("ctor", () => {
        let bitmask: BigBitMask;
        should().throw(() => bitmask = new BigBitMask(125 as any));
        should().not.throw(() => bitmask = new BigBitMask());
        should().throw(() => bitmask = new BigBitMask("AB@CD"));
        should().not.throw(() => bitmask = new BigBitMask("AB2CD"));
    });

    it("getter", async () => {
        let bitmask = new BigBitMask();
        should().throw(() => bitmask.get(true as any));
        should().throw(() => bitmask.get("5" as any));
        should().throw(() => bitmask.get(-1));
        should().not.throw(() => bitmask.get(0));
        should().not.throw(() => bitmask.get(1));
        should().not.throw(() => bitmask.get(1000));

        expect(bitmask.get(0), "Found bit on empty bit mask").to.be.false;
        expect(bitmask.get(1), "Found bit on empty bit mask").to.be.false;
        expect(bitmask.get(1000), "Found bit on empty bit mask").to.be.false;

        bitmask = new BigBitMask("CE");
        expect(bitmask.get(0), "Found bit where it was not set").to.be.false;
        expect(bitmask.get(2), "Found bit where it was not set").to.be.false;
        expect(bitmask.get(1000), "Found bit where it was not set").to.be.false;

        expect(bitmask.get(1), "Not found bit").to.be.true;
        expect(bitmask.get(8), "Not found bit").to.be.true;
    });

    it("setter", async () => {
        const bitmask = new BigBitMask();
        should().throw(() => bitmask.set(true as any, true));
        should().throw(() => bitmask.set("5" as any, true));
        should().throw(() => bitmask.set(-1, true));
        should().not.throw(() => bitmask.set(0, true));
        should().not.throw(() => bitmask.set(1, true));
        should().not.throw(() => bitmask.set(1000, true));

        expect(bitmask.get(0), "Not found bit").to.be.true;
        expect(bitmask.get(1), "Not found bit").to.be.true;
        expect(bitmask.get(1000), "Not found bit").to.be.true;

        should().not.throw(() => bitmask.set(1000, false));
        expect(bitmask.get(1000), "Found unset bit").to.be.false;
    });

    it("toString", async () => {
        let bitmask = new BigBitMask("CE");
        expect(bitmask.toString()).equals("CE");

        bitmask = new BigBitMask("CEAAAA");
        expect(bitmask.toString()).equals("CE");

        bitmask.set(1000, true);
        expect(bitmask.toString()).equals("CEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQ");

        bitmask.set(1000, false);
        expect(bitmask.toString()).equals("CE");
    });

    it("bitCapacity", async () => {
        const bitmask = new BigBitMask("CE");
        expect(bitmask.bitCapacity).equals(12);

        bitmask.set(1000, true);
        expect(bitmask.bitCapacity).equals(1002);

        bitmask.set(2000, false);
        expect(bitmask.bitCapacity).equals(1002);
    });
});
