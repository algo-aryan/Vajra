function decryptVal(plainText, passPhrase1, keySize, iterationCount)
            {
                var iv   = "00000000000000000000000000000000";
                var salt = "00000000000000000000000000000000";
                var aesUtil = new AesUtil(keySize, iterationCount);
                var v = aesUtil.decrypt(salt, iv, passPhrase1, plainText);
                return v;
            }

function decryptVal1(plainText)
{
    var iv   = "00000000000000000000000000000000";
    var salt = "00000000000000000000000000000000";
    var keySize = 128;
    var iterationCount = 10000;
    var passPhrase = "aesalgoisbestbes";
    var aesUtil = new AesUtil(keySize, iterationCount);
    var v = aesUtil.decrypt(salt, iv, passPhrase, plainText);
    return v;
}