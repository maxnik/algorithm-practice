import { huffman, encode, decode } from './huffman-codes.js'

test('decoded data matches the original before encoding', () => {
    const original = 'I want this message to get encoded!'

    const [encoder, decoder] = huffman(original)
    const encoded = encode(original, encoder)
    const recovered = decode(encoded, decoder)

    expect(recovered).toBe(original)
    expect(original.length > Math.ceil(encoded.length / 8)).toBe(true)
})