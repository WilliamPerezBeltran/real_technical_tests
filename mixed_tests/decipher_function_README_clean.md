# Decipher Function

## Problem Description

You are given an encrypted string (ciphertext).  
The encryption algorithm shifts all alphabetic characters in the original message by the same number of positions.  
Your task is to reverse this encryption and recover the original message.

You are also provided with a known word that appears in the original text.  
Using this information, your function must determine the shift value and return the decrypted message.

If the known word cannot be found in any decrypted version, the function should return "Invalid".

---

## Function Signature

```python
def decipher(ciphertext: str, known_word: str) -> str:
```

### Parameters
- ciphertext (str): The encrypted message.
- known_word (str): A known word that appears in the original message.

### Returns
- str: The decrypted message, or "Invalid" if the known word cannot be found.

---

## Example 1

Input:
```python
ciphertext = "Eqfkpi vguvu ctg hwp!"
known_word = "tests"
```

Output:
```python
"Coding tests are fun!"
```

Explanation:  
The ciphertext contains a five-letter word "vguvu".  
Comparing "tests" and "vguvu" shows that each character has been shifted by 2 positions.  
Reversing the shift (subtracting 2) reveals the original message:  
"Coding tests are fun!"

---

## Example 2

Input:
```python
ciphertext = "cdeb nqxg"
known_word = "love"
```

Output:
```python
"abcz love"
```

Explanation:  
Two possible matches exist for "love" → "cdeb" or "nqxg".  
Only "nqxg" maintains a consistent shift of 2.  
Therefore, decrypting with a shift of 2 results in "abcz love".

---

## Additional Notes

- The English alphabet wraps around (z → a, Z → A).
- Non-letter characters (spaces, punctuation, etc.) remain unchanged.
- If no valid decryption contains the known word, return "Invalid".
