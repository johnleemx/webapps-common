import truncateString from '~/util/truncateString';

describe('truncateString', () => {

    let fixtures = [{
        input: '',
        expected: ''
    }, {
        input: 'This is a short string',
        expected: 'This is a short string'
    }, {
        input: 'This is a very long string which should be truncated. This is a very long string which should be ' +
            'truncated. This is a very long string which should be truncated. This is a very long string which ' +
            'should be truncated.',
        expected: 'This is a very long string which should be truncated. This is a very long string which should ' +
            'be truncated. This is a very long string which should be truncate…'
    }, {
        input: 'This is a short but truncated string',
        expected: 'This is a short but truncate…',
        maxLength: 29
    }, {
        // input: undefined,
        expected: ''
    }];

    it('truncates strings', () => {
        fixtures.forEach(({ input, expected, maxLength }) => {
            expect(truncateString(input, maxLength)).toBe(expected);
        });
    });
});
