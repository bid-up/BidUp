const test = QUnit.test;

QUnit.module('html equal');

test('normalizes whitespace', (assert) => {
    const html = /*html*/`
            <div>
                <span>hello</span>
            </div>
    `;

    const expected = /*html*/`
        <div>
                <span>hello</span>
        </div>
    `;

    assert.htmlEqual(html, expected);
});
