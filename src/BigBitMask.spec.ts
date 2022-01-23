import { BigBitMask } from "BigBitMask";
import { expect, should } from "chai";

describe("BigBitMask tests", () => {
    function im(m: TestModel, v: boolean[]) {
        m.prop0 = v[0];
        m.prop1 = v[1];
        m.prop2 = v[2];
        m.prop3 = v[3];
        m.prop4 = v[4];
        m.prop5 = v[5];
        if (v.length > 6) {
            m.prop6 = v[6];
            m.prop7 = v[7];
            m.prop8 = v[8];
            m.prop9 = v[9];
        }
    }

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

        expect(bitmask.isEmpty, "Mask expected to be empty").to.be.true;

        expect(bitmask.get(0), "Found bit on empty bit mask").to.be.false;
        expect(bitmask.get(1), "Found bit on empty bit mask").to.be.false;
        expect(bitmask.get(1000), "Found bit on empty bit mask").to.be.false;

        bitmask = new BigBitMask("CE");

        expect(bitmask.isEmpty, "Mask expected to be not empty").to.be.false;

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

        expect(bitmask.isEmpty, "Mask expected to be not empty").to.be.false;

        expect(bitmask.get(0), "Not found bit").to.be.true;
        expect(bitmask.get(1), "Not found bit").to.be.true;
        expect(bitmask.get(1000), "Not found bit").to.be.true;

        should().not.throw(() => bitmask.set(1000, false));
        expect(bitmask.get(1000), "Found unset bit").to.be.false;

        should().not.throw(() => bitmask.set(0, false));
        should().not.throw(() => bitmask.set(1, false));
        expect(bitmask.isEmpty, "Mask expected to be empty").to.be.true;
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

    it("equality", async () => {
        const a = new TestModel();
        const b = new TestModel();
        const c = new TestModel();
        const d = new TestModel();

        im(a, [true, false, true, false, true, false, true, false, true, false]);
        im(b, [true, false, true, false, true, false, true, false, true, false]);
        im(c, [true, false, true, false, true, false, true, false, true, true]);
        im(d, [true, false, true, false, true, false]);

        expect(TestModel.EQUALS(a, b), "Masks not equals").to.be.true;
        expect(TestModel.EQUALS(a, c), "Masks is equals").to.be.false;
        expect(TestModel.EQUALS(a, d), "Masks is equals").to.be.false;
    });

    it("bitwiseOperations", async () => {
        const masks = [new TestModel(), new TestModel(), new TestModel()];

        const refMasks = [];
        refMasks.push(new TestModel());
        refMasks.push(new TestModel());
        refMasks.push(new TestModel());

        im(masks[0], [true, false, false, true, true, false]);
        im(masks[1], [true, false, true, false, true, false, true, false, true, false]);
        im(masks[2], [true, true, false, false, true, false, true, true, false, false]);

        im(refMasks[0], [true, false, false, true, true, false]);
        im(refMasks[1], [true, false, true, false, true, false, true, false, true, false]);
        im(refMasks[2], [true, true, false, false, true, false, true, true, false, false]);

        const or = TestModel.OR(...masks);
        const and = TestModel.AND(...masks);
        const xor = TestModel.XOR(...masks);

        const orExpected = new TestModel();
        const andExpected = new TestModel();
        const xorExpected = new TestModel();

        im(orExpected, [true, true, true, true, true, false, true, true, true, false]);
        im(andExpected, [true, false, false, false, true, false, false, false, false, false]);
        im(xorExpected, [true, true, true, true, true, false, false, true, true, false]);

        expect(or, "Expected not undefined result").not.to.be.undefined;
        expect(and, "Expected not undefined result").not.to.be.undefined;
        expect(xor, "Expected not undefined result").not.to.be.undefined;

        expect(TestModel.EQUALS(refMasks[0], masks[0]), "Masks not equals").to.be.true;
        expect(TestModel.EQUALS(refMasks[1], masks[1]), "Masks not equals").to.be.true;
        expect(TestModel.EQUALS(refMasks[2], masks[2]), "Masks not equals").to.be.true;

        expect(TestModel.EQUALS(or!, orExpected), "Masks not equals").to.be.true;
        expect(TestModel.EQUALS(and!, andExpected), "Masks not equals").to.be.true;
        expect(TestModel.EQUALS(xor!, xorExpected), "Masks not equals").to.be.true;

        const or2 = TestModel.OR(masks[0], TestModel.OR(masks[1], masks[2]));
        const and2 = TestModel.AND(masks[0], TestModel.AND(masks[1], masks[2]));
        const xor2 = TestModel.XOR(masks[0], TestModel.XOR(masks[1], masks[2]));

        expect(TestModel.EQUALS(refMasks[0], masks[0]), "Masks not equals").to.be.true;
        expect(TestModel.EQUALS(refMasks[1], masks[1]), "Masks not equals").to.be.true;
        expect(TestModel.EQUALS(refMasks[2], masks[2]), "Masks not equals").to.be.true;

        expect(TestModel.EQUALS(or2, orExpected), "Masks not equals").to.be.true;
        expect(TestModel.EQUALS(and2, andExpected), "Masks not equals").to.be.true;
        expect(TestModel.EQUALS(xor2, xorExpected), "Masks not equals").to.be.true;

        masks.reverse();
        refMasks.reverse();

        const or3 = TestModel.OR(masks);
        const and3 = TestModel.AND(masks);
        const xor3 = TestModel.XOR(masks);

        expect(or3, "Expected not undefined result").not.to.be.undefined;
        expect(and3, "Expected not undefined result").not.to.be.undefined;
        expect(xor3, "Expected not undefined result").not.to.be.undefined;

        expect(TestModel.EQUALS(refMasks[0], masks[0]), "Masks not equals").to.be.true;
        expect(TestModel.EQUALS(refMasks[1], masks[1]), "Masks not equals").to.be.true;
        expect(TestModel.EQUALS(refMasks[2], masks[2]), "Masks not equals").to.be.true;

        expect(TestModel.EQUALS(or3!, orExpected), "Masks not equals").to.be.true;
        expect(TestModel.EQUALS(and3!, andExpected), "Masks not equals").to.be.true;
        expect(TestModel.EQUALS(xor3!, xorExpected), "Masks not equals").to.be.true;

        const emptyModel = new TestModel();
        const andEmpty = TestModel.AND(masks[0], emptyModel, masks[1], masks[2]);
        expect(andEmpty.isEmpty, "Mask expected to be empty").to.be.true;
    });

    it("bitwiseOperationsEdgeCases", async () => {
        expect(TestModel.OR(), "Expected undefined result").to.be.undefined;
        expect(TestModel.AND(), "Expected undefined result").to.be.undefined;
        expect(TestModel.XOR(), "Expected undefined result").to.be.undefined;
        expect(TestModel.OR(...[]), "Expected undefined result").to.be.undefined;
        expect(TestModel.AND(...[]), "Expected undefined result").to.be.undefined;
        expect(TestModel.XOR(...[]), "Expected undefined result").to.be.undefined;
        expect(TestModel.OR([]), "Expected undefined result").to.be.undefined;
        expect(TestModel.AND([]), "Expected undefined result").to.be.undefined;
        expect(TestModel.XOR([]), "Expected undefined result").to.be.undefined;

        const model = new TestModel();
        const badTypeModel: TestModel = 42 as any;

        should().throw(() => TestModel.OR(model, badTypeModel), TypeError);
        should().throw(() => TestModel.AND(model, badTypeModel), TypeError);
        should().throw(() => TestModel.XOR(model, badTypeModel), TypeError);
        should().throw(() => TestModel.OR(badTypeModel, model), TypeError);
        should().throw(() => TestModel.AND(badTypeModel, model), TypeError);
        should().throw(() => TestModel.XOR(badTypeModel, model), TypeError);
    });
});

class TestModel extends BigBitMask {
    public static readonly PROP_0 = 0;
    public static readonly PROP_1 = 1;
    public static readonly PROP_2 = 2;
    public static readonly PROP_3 = 3;
    public static readonly PROP_4 = 4;
    public static readonly PROP_5 = 5;
    public static readonly PROP_6 = 6;
    public static readonly PROP_7 = 7;
    public static readonly PROP_8 = 8;
    public static readonly PROP_9 = 9;

    public get prop0(): boolean { return this.get(TestModel.PROP_0); }
    public set prop0(value: boolean) { this.set(TestModel.PROP_0, value); }

    public get prop1(): boolean { return this.get(TestModel.PROP_1); }
    public set prop1(value: boolean) { this.set(TestModel.PROP_1, value); }

    public get prop2(): boolean { return this.get(TestModel.PROP_2); }
    public set prop2(value: boolean) { this.set(TestModel.PROP_2, value); }

    public get prop3(): boolean { return this.get(TestModel.PROP_3); }
    public set prop3(value: boolean) { this.set(TestModel.PROP_3, value); }

    public get prop4(): boolean { return this.get(TestModel.PROP_4); }
    public set prop4(value: boolean) { this.set(TestModel.PROP_4, value); }

    public get prop5(): boolean { return this.get(TestModel.PROP_5); }
    public set prop5(value: boolean) { this.set(TestModel.PROP_5, value); }

    public get prop6(): boolean { return this.get(TestModel.PROP_6); }
    public set prop6(value: boolean) { this.set(TestModel.PROP_6, value); }

    public get prop7(): boolean { return this.get(TestModel.PROP_7); }
    public set prop7(value: boolean) { this.set(TestModel.PROP_7, value); }

    public get prop8(): boolean { return this.get(TestModel.PROP_8); }
    public set prop8(value: boolean) { this.set(TestModel.PROP_8, value); }

    public get prop9(): boolean { return this.get(TestModel.PROP_9); }
    public set prop9(value: boolean) { this.set(TestModel.PROP_9, value); }
}
