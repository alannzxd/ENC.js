const JsConfuser = require('js-confuser');
const crypto = require('crypto');

// --- Time-Locked Encryption ---
const obfuscateTimeLocked = async (fileContent, days) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + parseInt(days));
    const expiryTimestamp = expiryDate.getTime();
    try {
        const obfuscated = await JsConfuser.obfuscate(
            `(function(){
                const expiry=${expiryTimestamp};
                if(new Date().getTime()>expiry){
                    throw new Error('Script has expired after ${days} days');
                }
                (function(){
                    ${fileContent}
                })()
            })();`,
            {
                target: "node",
                compact: true,
                renameVariables: true,
                renameGlobals: true,
                identifierGenerator: "randomized",
                stringCompression: true,
                stringConcealing: true,
                stringEncoding: true,
                controlFlowFlattening: 0.75,
                flatten: true,
                shuffle: true,
                rgf: false,
                opaquePredicates: { count: 6, complexity: 4 },
                dispatcher: true,
                globalConcealing: true,
                lock: {
                    selfDefending: true,
                    antiDebug: (code) => `if(typeof debugger!=='undefined'||process.env.NODE_ENV==='debug')throw new Error('Debugging disabled');${code}`,
                    integrity: true,
                    tamperProtection: (code) => `if(!((function(){return eval('1+1')===2;})()))throw new Error('Tamper detected');${code}`
                },
                duplicateLiteralsRemoval: true
            }
        );
        let obfuscatedCode = obfuscated.code || obfuscated;
        if (typeof obfuscatedCode !== "string") throw new Error("Hasil obfuscation bukan string");
        return obfuscatedCode;
    } catch (error) {
        throw new Error(`Gagal obfuscate: ${error.message}`);
    }
};

// --- Quantum Vortex Encryption ---
const obfuscateQuantum = async (fileContent) => {
    const generateTimeBasedIdentifier = () => {
        const timeStamp = new Date().getTime().toString().slice(-5);
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$#@&*";
        let identifier = "qV_";
        for (let i = 0; i < 7; i++) {
            identifier += chars[Math.floor((parseInt(timeStamp[i % 5]) + i * 2) % chars.length)];
        }
        return identifier;
    };

    const currentMilliseconds = new Date().getMilliseconds();
    const phantomCode = currentMilliseconds % 3 === 0 ? `if(Math.random()>0.999)console.log('PhantomTrigger');` : "";

    try {
        const obfuscated = await JsConfuser.obfuscate(fileContent + phantomCode, {
            target: "node",
            compact: true,
            renameVariables: true,
            renameGlobals: true,
            identifierGenerator: generateTimeBasedIdentifier,
            stringCompression: true,
            stringConcealing: false,
            stringEncoding: true,
            controlFlowFlattening: 0.85,
            flatten: true,
            shuffle: true,
            rgf: true,
            opaquePredicates: { count: 8, complexity: 5 },
            dispatcher: true,
            globalConcealing: true,
            lock: {
                selfDefending: true,
                antiDebug: (code) => `if(typeof debugger!=='undefined'||(typeof process!=='undefined'&&process.env.NODE_ENV==='debug'))throw new Error('Debugging disabled');${code}`,
                integrity: true,
                tamperProtection: (code) => `if(!((function(){return eval('1+1')===2;})()))throw new Error('Tamper detected');${code}`
            },
            duplicateLiteralsRemoval: true
        });
        let obfuscatedCode = obfuscated.code || obfuscated;
        if (typeof obfuscatedCode !== "string") throw new Error("Hasil obfuscation bukan string");
        const key = currentMilliseconds % 256;
        obfuscatedCode = `(function(){let k=${key};return function(c){return c.split('').map((x,i)=>String.fromCharCode(x.charCodeAt(0)^(k+(i%16)))).join('');}('${obfuscatedCode}');})()`;
        return obfuscatedCode;
    } catch (error) {
        throw new Error(`Gagal obfuscate: ${error.message}`);
    }
};

// --- Config Getters ---
const getSiuCalcrickObfuscationConfig = () => {
    const generateSiuCalcrickName = () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let randomPart = "";
        for (let i = 0; i < 6; i++) randomPart += chars[Math.floor(Math.random() * chars.length)];
        return `AlannXD和Holow无与伦比的帅气${randomPart}`;
    };
    return {
        target: "node", compact: true, renameVariables: true, renameGlobals: true,
        identifierGenerator: generateSiuCalcrickName,
        stringCompression: true, stringEncoding: true, stringSplitting: true,
        controlFlowFlattening: 0.95, shuffle: true, rgf: false, flatten: true,
        duplicateLiteralsRemoval: true, deadCode: true, calculator: true,
        opaquePredicates: true,
        lock: { selfDefending: true, antiDebug: true, integrity: true, tamperProtection: true }
    };
};

const getNebulaObfuscationConfig = () => {
    const generateNebulaName = () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let randomPart = "";
        for (let i = 0; i < 4; i++) randomPart += chars[Math.floor(Math.random() * chars.length)];
        return `NX${randomPart}`;
    };
    return {
        target: "node", compact: true, renameVariables: true, renameGlobals: true,
        identifierGenerator: generateNebulaName,
        stringCompression: true, stringConcealing: false, stringEncoding: true, stringSplitting: false,
        controlFlowFlattening: 0.75, flatten: true, shuffle: true, rgf: true,
        deadCode: true, opaquePredicates: true, dispatcher: true,
        globalConcealing: true, objectExtraction: true, duplicateLiteralsRemoval: true,
        lock: { selfDefending: true, antiDebug: true, integrity: true, tamperProtection: true }
    };
};

const getNovaObfuscationConfig = () => {
    const generateNovaName = () => {
        const prefixes = ["nZ", "nova", "nx"];
        const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const hash = crypto.createHash('sha256').update(crypto.randomBytes(8)).digest('hex').slice(0, 6);
        const suffix = Math.random().toString(36).slice(2, 5);
        return `${randomPrefix}_${hash}_${suffix}`;
    };
    return {
        target: "node", compact: true, renameVariables: true, renameGlobals: true,
        identifierGenerator: generateNovaName,
        stringCompression: true, stringConcealing: true, stringEncoding: true, stringSplitting: false,
        controlFlowFlattening: 0.5, flatten: true, shuffle: true, rgf: false,
        deadCode: false, opaquePredicates: true, dispatcher: true,
        globalConcealing: true, objectExtraction: true, duplicateLiteralsRemoval: true,
        lock: { selfDefending: true, antiDebug: true, integrity: true, tamperProtection: true }
    };
};

const getXObfuscationConfig = () => {
    const generateXName = () => "xZ" + crypto.randomUUID().slice(0, 4);
    return {
        target: "node", compact: true, renameVariables: true, renameGlobals: true,
        identifierGenerator: generateXName,
        stringCompression: true, stringConcealing: true, stringEncoding: true, stringSplitting: false,
        controlFlowFlattening: 0.5, flatten: true, shuffle: true, rgf: true,
        deadCode: false, opaquePredicates: true, dispatcher: true,
        globalConcealing: true, objectExtraction: true, duplicateLiteralsRemoval: true,
        lock: { selfDefending: true, antiDebug: true, integrity: true, tamperProtection: true }
    };
};

const getMaxObfuscationConfig = (intensity) => {
    const generateMaxName = () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let name = "mX";
        for (let i = 0; i < Math.floor(Math.random() * 4) + 4; i++) name += chars[Math.floor(Math.random() * chars.length)];
        return name;
    };
    const flatteningLevel = intensity / 10;
    return {
        target: "node", compact: true, renameVariables: true, renameGlobals: true,
        identifierGenerator: generateMaxName,
        stringCompression: true, stringConcealing: true, stringEncoding: true, stringSplitting: true,
        controlFlowFlattening: flatteningLevel, flatten: true, shuffle: true,
        rgf: true, calculator: true, deadCode: true, opaquePredicates: true,
        dispatcher: true, globalConcealing: true, objectExtraction: true, duplicateLiteralsRemoval: false,
        lock: { selfDefending: true, antiDebug: true, integrity: true, tamperProtection: true }
    };
};

const getBigObfuscationConfig = () => {
    const generateBigName = () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let name = "";
        for (let i = 0; i < Math.floor(Math.random() * 5) + 5; i++) name += chars[Math.floor(Math.random() * chars.length)];
        return name;
    };
    return {
        target: "node", compact: true, renameVariables: true, renameGlobals: true,
        identifierGenerator: generateBigName,
        stringEncoding: true, stringSplitting: true,
        controlFlowFlattening: 0.75, shuffle: true, duplicateLiteralsRemoval: true,
        deadCode: true, opaquePredicates: true,
        lock: { selfDefending: true, antiDebug: true, integrity: true, tamperProtection: true }
    };
};

const getInvisObfuscationConfig = () => {
    const generateInvisName = () => {
        let name = "";
        for (let i = 0; i < Math.floor(Math.random() * 4) + 3; i++) name += "_";
        return name + Math.random().toString(36).substring(2, 5);
    };
    return {
        target: "node", compact: true, renameVariables: true, renameGlobals: true,
        identifierGenerator: generateInvisName,
        stringEncoding: true, stringSplitting: true,
        controlFlowFlattening: 0.95, shuffle: true, duplicateLiteralsRemoval: true,
        deadCode: true, calculator: true, opaquePredicates: true,
        lock: { selfDefending: true, antiDebug: true, integrity: true, tamperProtection: true }
    };
};

const getStealthObfuscationConfig = () => {
    const generateStealthName = () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let name = "";
        for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) name += chars[Math.floor(Math.random() * chars.length)];
        return name;
    };
    return {
        target: "node", compact: true, renameVariables: true, renameGlobals: true,
        identifierGenerator: generateStealthName,
        stringEncoding: true, stringSplitting: true,
        controlFlowFlattening: 0.75, shuffle: true, duplicateLiteralsRemoval: true,
        deadCode: true, opaquePredicates: true,
        lock: { selfDefending: true, antiDebug: true, integrity: true, tamperProtection: true }
    };
};

const getStrongObfuscationConfig = () => ({
    target: "node", compact: true, renameVariables: true, renameGlobals: true,
    identifierGenerator: "randomized",
    stringEncoding: true, stringSplitting: true,
    controlFlowFlattening: 0.75, duplicateLiteralsRemoval: true,
    calculator: true, dispatcher: true, deadCode: true, opaquePredicates: true,
    lock: { selfDefending: true, antiDebug: true, integrity: true, tamperProtection: true }
});

const getUltraObfuscationConfig = () => {
    const generateUltraName = () => {
        const chars = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        return `z${numbers[Math.floor(Math.random() * numbers.length)]}${chars[Math.floor(Math.random() * chars.length)]}${Math.random().toString(36).substring(2, 6)}`;
    };
    return {
        target: "node", compact: true, renameVariables: true, renameGlobals: true,
        identifierGenerator: generateUltraName,
        stringCompression: true, stringEncoding: true, stringSplitting: true,
        controlFlowFlattening: 0.9, flatten: true, shuffle: true, rgf: true,
        deadCode: true, opaquePredicates: true, dispatcher: true,
        lock: { selfDefending: true, antiDebug: true, integrity: true, tamperProtection: true }
    };
};

const getJapanObfuscationConfig = () => {
    const japaneseChars = ["あ","い","う","え","お","か","き","く","け","こ","さ","し","す","せ","そ","た","ち","つ","て","と","な","に","ぬ","ね","の","は","ひ","ふ","へ","ほ","ま","み","む","め","も","や","ゆ","よ","ら","り","る","れ","ろ","わ","を","ん"];
    const generateJapaneseName = () => {
        let name = "";
        for (let i = 0; i < Math.floor(Math.random() * 4) + 3; i++) name += japaneseChars[Math.floor(Math.random() * japaneseChars.length)];
        return name;
    };
    return {
        target: "node", compact: true, renameVariables: true, renameGlobals: true,
        identifierGenerator: generateJapaneseName,
        stringEncoding: true, stringSplitting: true,
        controlFlowFlattening: 0.9, flatten: true, shuffle: true,
        duplicateLiteralsRemoval: true, deadCode: true, calculator: true, opaquePredicates: true,
        lock: { selfDefending: true, antiDebug: true, integrity: true, tamperProtection: true }
    };
};

const getJapanxArabObfuscationConfig = () => {
    const japaneseXArabChars = ["あ","い","う","え","お","か","き","く","け","こ","さ","し","す","せ","そ","た","ち","つ","て","と","な","に","ぬ","ね","の","は","ひ","ふ","へ","ほ","ま","み","む","め","も","や","ゆ","よ","أ","ب","ت","ث","ج","ح","خ","د","ذ","ر","ز","س","ش","ص","ض","ط","ظ","ع","غ","ف","ق","ك","ل","م","ن","ه","و","ي","ら","り","る","れ","ろ","わ","を","ん"];
    const generateJapaneseXArabName = () => {
        let name = "";
        for (let i = 0; i < Math.floor(Math.random() * 4) + 3; i++) name += japaneseXArabChars[Math.floor(Math.random() * japaneseXArabChars.length)];
        return name;
    };
    return {
        target: "node", compact: true, renameVariables: true, renameGlobals: true,
        identifierGenerator: generateJapaneseXArabName,
        stringCompression: true, stringConcealing: true, stringEncoding: true, stringSplitting: true,
        controlFlowFlattening: 0.95, flatten: true, shuffle: true, rgf: false,
        dispatcher: true, duplicateLiteralsRemoval: true, deadCode: true,
        calculator: true, opaquePredicates: true,
        lock: { selfDefending: true, antiDebug: true, integrity: true, tamperProtection: true }
    };
};

const getMandarinObfuscationConfig = () => {
    const mandarinChars = ["龙","虎","风","云","山","河","天","地","雷","电","火","水","木","金","土","星","月","日","光","影","峰","泉","林","海","雪","霜","雾","冰","焰","石"];
    const generateMandarinName = () => {
        let name = "";
        for (let i = 0; i < Math.floor(Math.random() * 4) + 3; i++) name += mandarinChars[Math.floor(Math.random() * mandarinChars.length)];
        return name;
    };
    return {
        target: "node", compact: true, renameVariables: true, renameGlobals: true,
        identifierGenerator: generateMandarinName,
        stringEncoding: true, stringSplitting: true,
        controlFlowFlattening: 0.95, shuffle: true, duplicateLiteralsRemoval: true,
        deadCode: true, calculator: true, opaquePredicates: true,
        lock: { selfDefending: true, antiDebug: true, integrity: true, tamperProtection: true }
    };
};

const getArabObfuscationConfig = () => {
    const arabicChars = ["أ","ب","ت","ث","ج","ح","خ","د","ذ","ر","ز","س","ش","ص","ض","ط","ظ","ع","غ","ف","ق","ك","ل","م","ن","ه","و","ي"];
    const generateArabicName = () => {
        let name = "";
        for (let i = 0; i < Math.floor(Math.random() * 4) + 3; i++) name += arabicChars[Math.floor(Math.random() * arabicChars.length)];
        return name;
    };
    return {
        target: "node", compact: true, renameVariables: true, renameGlobals: true,
        identifierGenerator: generateArabicName,
        stringEncoding: true, stringSplitting: true,
        controlFlowFlattening: 0.95, shuffle: true, duplicateLiteralsRemoval: true,
        deadCode: true, calculator: true, opaquePredicates: true,
        lock: { selfDefending: true, antiDebug: true, integrity: true, tamperProtection: true }
    };
};

const getNewObfuscationConfig = () => ({
    target: "node", compact: true, renameVariables: true, renameGlobals: true,
    identifierGenerator: "mangled",
    stringEncoding: true, stringSplitting: true,
    controlFlowFlattening: 0.95, shuffle: true, duplicateLiteralsRemoval: true,
    deadCode: true, calculator: true, opaquePredicates: true,
    lock: { selfDefending: true, antiDebug: true, integrity: true, tamperProtection: true }
});

const getCustomObfuscationConfig = (customName) => {
    const generateCustomName = () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let suffix = "";
        for (let i = 0; i < Math.floor(Math.random() * 3) + 2; i++) suffix += chars[Math.floor(Math.random() * chars.length)];
        return `${customName}_${suffix}`;
    };
    return {
        target: "node", compact: true, renameVariables: true, renameGlobals: true,
        identifierGenerator: generateCustomName,
        stringEncoding: true, stringSplitting: true,
        controlFlowFlattening: 0.75, shuffle: true, duplicateLiteralsRemoval: true,
        deadCode: true, opaquePredicates: true,
        lock: { selfDefending: true, antiDebug: true, integrity: true, tamperProtection: true }
    };
};

// Invisible encode/decode helpers
function encodeInvisible(text) {
    try {
        const compressedText = text.replace(/\s+/g, ' ').trim();
        const base64Text = Buffer.from(compressedText).toString('base64');
        return '\u200B' + base64Text;
    } catch (e) {
        return Buffer.from(text).toString('base64');
    }
}

// ============= SERVERLESS HANDLER =============
module.exports = async (req, res) => {
    // Enable CORS for frontend
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { code, mode, days, intensity, size, customName } = req.body;

    if (!code) {
        return res.status(400).json({ error: 'No code provided' });
    }

    try {
        let obfuscatedCode = '';

        switch (mode) {
            case 'enc':
                const level = 'high'; // default high
                const config = {
                    target: "node", compact: true, renameVariables: true, renameGlobals: true,
                    identifierGenerator: "mangled", stringEncoding: true, stringSplitting: true,
                    controlFlowFlattening: 0.95, shuffle: true, duplicateLiteralsRemoval: true,
                    deadCode: true, calculator: true, opaquePredicates: true,
                    lock: { selfDefending: true, antiDebug: true, integrity: true, tamperProtection: true }
                };
                const obf = await JsConfuser.obfuscate(code, config);
                obfuscatedCode = obf.code || obf;
                break;
            case 'enceval':
                const evalConfig = {
                    target: "node", compact: true, renameVariables: true, renameGlobals: true,
                    identifierGenerator: "mangled", stringEncoding: true, stringSplitting: true,
                    controlFlowFlattening: 0.95, shuffle: true, duplicateLiteralsRemoval: true,
                    deadCode: true, calculator: true, opaquePredicates: true,
                    lock: { selfDefending: true, antiDebug: true, integrity: true, tamperProtection: true }
                };
                const ev = await JsConfuser.obfuscate(code, evalConfig);
                obfuscatedCode = ev.code || ev;
                break;
            case 'customenc':
                const custConf = getCustomObfuscationConfig(customName || 'AlannXD');
                const cust = await JsConfuser.obfuscate(code, custConf);
                obfuscatedCode = cust.code || cust;
                break;
            case 'encmax':
                const maxConf = getMaxObfuscationConfig(intensity || 7);
                const max = await JsConfuser.obfuscate(code, maxConf);
                obfuscatedCode = max.code || max;
                break;
            case 'encbig':
                const bigConf = getBigObfuscationConfig();
                const big = await JsConfuser.obfuscate(code, bigConf);
                let bigCode = big.code || big;
                const targetSizeBytes = (size || 5) * 1024 * 1024;
                const currentSizeBytes = Buffer.byteLength(bigCode, 'utf8');
                if (currentSizeBytes < targetSizeBytes) {
                    const paddingSize = targetSizeBytes - currentSizeBytes;
                    const padding = crypto.randomBytes(paddingSize).toString('base64');
                    bigCode += `\n/* Binary Padding (${paddingSize} bytes) */\n// ${padding}`;
                }
                obfuscatedCode = bigCode;
                break;
            case 'encchina':
                const china = await JsConfuser.obfuscate(code, getMandarinObfuscationConfig());
                obfuscatedCode = china.code || china;
                break;
            case 'encarab':
                const arab = await JsConfuser.obfuscate(code, getArabObfuscationConfig());
                obfuscatedCode = arab.code || arab;
                break;
            case 'encjapan':
                const japan = await JsConfuser.obfuscate(code, getJapanObfuscationConfig());
                obfuscatedCode = japan.code || japan;
                break;
            case 'encjapxab':
                const japxab = await JsConfuser.obfuscate(code, getJapanxArabObfuscationConfig());
                obfuscatedCode = japxab.code || japxab;
                break;
            case 'encinvis':
                const invisConf = getInvisObfuscationConfig();
                const invis = await JsConfuser.obfuscate(code, invisConf);
                obfuscatedCode = invis.code || invis;
                break;
            case 'encnebula':
                const neb = await JsConfuser.obfuscate(code, getNebulaObfuscationConfig());
                obfuscatedCode = neb.code || neb;
                break;
            case 'encnova':
                const nova = await JsConfuser.obfuscate(code, getNovaObfuscationConfig());
                obfuscatedCode = nova.code || nova;
                break;
            case 'encsiu':
                const siu = await JsConfuser.obfuscate(code, getSiuCalcrickObfuscationConfig());
                obfuscatedCode = siu.code || siu;
                break;
            case 'encx':
                const xConf = getXObfuscationConfig();
                const x = await JsConfuser.obfuscate(code, xConf);
                const xCode = x.code || x;
                const encodedInvisible = encodeInvisible(xCode);
                obfuscatedCode = `
                (function(){
                    function decodeInvisible(encodedText) {
                        if (!encodedText.startsWith('\u200B')) return encodedText;
                        try {
                            return Buffer.from(encodedText.slice(1), 'base64').toString('utf-8');
                        } catch (e) {
                            return encodedText;
                        }
                    }
                    try {
                        const hiddenCode = "${encodedInvisible}";
                        const decodedCode = decodeInvisible(hiddenCode);
                        if (!decodedCode || decodedCode === hiddenCode) throw new Error("Decoding failed");
                        eval(decodedCode);
                    } catch (e) {
                        console.error("Execution error:", e);
                    }
                })();
                `;
                break;
            case 'encnew':
                const newConf = getNewObfuscationConfig();
                const newEnc = await JsConfuser.obfuscate(code, newConf);
                obfuscatedCode = newEnc.code || newEnc;
                break;
            case 'encstealth':
                const stealth = await JsConfuser.obfuscate(code, getStealthObfuscationConfig());
                obfuscatedCode = stealth.code || stealth;
                break;
            case 'encstrong':
                const strong = await JsConfuser.obfuscate(code, getStrongObfuscationConfig());
                obfuscatedCode = strong.code || strong;
                break;
            case 'encultra':
                const ultra = await JsConfuser.obfuscate(code, getUltraObfuscationConfig());
                obfuscatedCode = ultra.code || ultra;
                break;
            case 'encquantum':
                obfuscatedCode = await obfuscateQuantum(code);
                break;
            case 'enclocked':
                obfuscatedCode = await obfuscateTimeLocked(code, days || 7);
                break;
            default:
                return res.status(400).json({ error: 'Invalid mode' });
        }

        // Ensure string
        if (typeof obfuscatedCode !== 'string') {
            obfuscatedCode = String(obfuscatedCode);
        }

        return res.status(200).json({ obfuscatedCode });
    } catch (error) {
        console.error('Encryption error:', error);
        return res.status(500).json({ error: error.message || 'Internal server error' });
    }
};
