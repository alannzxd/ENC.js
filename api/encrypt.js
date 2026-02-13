import JsConfuser from 'js-confuser';
import crypto from 'crypto';

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
        target: "node", 
        compact: true, 
        renameVariables: true, 
        renameGlobals: true,
        identifierGenerator: generateSiuCalcrickName,
        stringCompression: true, 
        stringEncoding: true, 
        stringSplitting: true,
        controlFlowFlattening: 0.95, 
        shuffle: true, 
        rgf: false, 
        flatten: true,
        duplicateLiteralsRemoval: true, 
        deadCode: true, 
        calculator: true,
        opaquePredicates: true,
        lock: { 
            selfDefending: true, 
            antiDebug: true, 
            integrity: true, 
            tamperProtection: true 
        }
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
        target: "node", 
        compact: true, 
        renameVariables: true, 
        renameGlobals: true,
        identifierGenerator: generateNebulaName,
        stringCompression: true, 
        stringConcealing: false, 
        stringEncoding: true, 
        stringSplitting: false,
        controlFlowFlattening: 0.75, 
        flatten: true, 
        shuffle: true, 
        rgf: true,
        deadCode: true, 
        opaquePredicates: true, 
        dispatcher: true,
        globalConcealing: true, 
        objectExtraction: true, 
        duplicateLiteralsRemoval: true,
        lock: { 
            selfDefending: true, 
            antiDebug: true, 
            integrity: true, 
            tamperProtection: true 
        }
    };
};

const getNovaObfuscationConfig = () => {
    const generateNovaName = () => {
        const prefixes = ["nZ", "nova", "nx"];
        const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const hash = crypto.createHash('sha256')
            .update(crypto.randomBytes(8))
            .digest('hex')
            .slice(0, 6);
        const suffix = Math.random().toString(36).slice(2, 5);
        return `${randomPrefix}_${hash}_${suffix}`;
    };
    return {
        target: "node", 
        compact: true, 
        renameVariables: true, 
        renameGlobals: true,
        identifierGenerator: generateNovaName,
        stringCompression: true, 
        stringConcealing: true, 
        stringEncoding: true, 
        stringSplitting: false,
        controlFlowFlattening: 0.5, 
        flatten: true, 
        shuffle: true, 
        rgf: false,
        deadCode: false, 
        opaquePredicates: true, 
        dispatcher: true,
        globalConcealing: true, 
        objectExtraction: true, 
        duplicateLiteralsRemoval: true,
        lock: { 
            selfDefending: true, 
            antiDebug: true, 
            integrity: true, 
            tamperProtection: true 
        }
    };
};

const getXObfuscationConfig = () => {
    const generateXName = () => "xZ" + crypto.randomUUID().slice(0, 4);
    return {
        target: "node", 
        compact: true, 
        renameVariables: true, 
        renameGlobals: true,
        identifierGenerator: generateXName,
        stringCompression: true, 
        stringConcealing: true, 
        stringEncoding: true, 
        stringSplitting: false,
        controlFlowFlattening: 0.5, 
        flatten: true, 
        shuffle: true, 
        rgf: true,
        deadCode: false, 
        opaquePredicates: true, 
        dispatcher: true,
        globalConcealing: true, 
        objectExtraction: true, 
        duplicateLiteralsRemoval: true,
        lock: { 
            selfDefending: true, 
            antiDebug: true, 
            integrity: true, 
            tamperProtection: true 
        }
    };
};

const getMaxObfuscationConfig = (intensity) => {
    const generateMaxName = () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let name = "mX";
        for (let i = 0; i < Math.floor(Math.random() * 4) + 4; i++) 
            name += chars[Math.floor(Math.random() * chars.length)];
        return name;
    };
    const flatteningLevel = intensity / 10;
    return {
        target: "node", 
        compact: true, 
        renameVariables: true, 
        renameGlobals: true,
        identifierGenerator: generateMaxName,
        stringCompression: true, 
        stringConcealing: true, 
        stringEncoding: true, 
        stringSplitting: true,
        controlFlowFlattening: flatteningLevel, 
        flatten: true, 
        shuffle: true,
        rgf: true, 
        calculator: true, 
        deadCode: true, 
        opaquePredicates: true,
        dispatcher: true, 
        globalConcealing: true, 
        objectExtraction: true, 
        duplicateLiteralsRemoval: false,
        lock: { 
            selfDefending: true, 
            antiDebug: true, 
            integrity: true, 
            tamperProtection: true 
        }
    };
};

const getBigObfuscationConfig = () => {
    const generateBigName = () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let name = "";
        for (let i = 0; i < Math.floor(Math.random() * 5) + 5; i++) 
            name += chars[Math.floor(Math.random() * chars.length)];
        return name;
    };
    return {
        target: "node", 
        compact: true, 
        renameVariables: true, 
        renameGlobals: true,
        identifierGenerator: generateBigName,
        stringEncoding: true, 
        stringSplitting: true,
        controlFlowFlattening: 0.75, 
        shuffle: true, 
        duplicateLiteralsRemoval: true,
        deadCode: true, 
        opaquePredicates: true,
        lock: { 
            selfDefending: true, 
            antiDebug: true, 
            integrity: true, 
            tamperProtection: true 
        }
    };
};

const getInvisObfuscationConfig = () => {
    const generateInvisName = () => {
        let name = "";
        for (let i = 0; i < Math.floor(Math.random() * 4) + 3; i++) name += "_";
        return name + Math.random().toString(36).substring(2, 5);
    };
    return {
        target: "node", 
        compact: true, 
        renameVariables: true, 
        renameGlobals: true,
        identifierGenerator: generateInvisName,
        stringEncoding: true, 
        stringSplitting: true,
        controlFlowFlattening: 0.95, 
        shuffle: true, 
        duplicateLiteralsRemoval: true,
        deadCode: true, 
        calculator: true, 
        opaquePredicates: true,
        lock: { 
            selfDefending: true, 
            antiDebug: true, 
            integrity: true, 
            tamperProtection: true 
        }
    };
};

const getStealthObfuscationConfig = () => {
    const generateStealthName = () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let name = "";
        for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) 
            name += chars[Math.floor(Math.random() * chars.length)];
        return name;
    };
    return {
        target: "node", 
        compact: true, 
        renameVariables: true, 
        renameGlobals: true,
        identifierGenerator: generateStealthName,
        stringEncoding: true, 
        stringSplitting: true,
        controlFlowFlattening: 0.75, 
        shuffle: true, 
        duplicateLiteralsRemoval: true,
        deadCode: true, 
        opaquePredicates: true,
        lock: { 
            selfDefending: true, 
            antiDebug: true, 
            integrity: true, 
            tamperProtection: true 
        }
    };
};

const getStrongObfuscationConfig = () => ({
    target: "node", 
    compact: true, 
    renameVariables: true, 
    renameGlobals: true,
    identifierGenerator: "randomized",
    stringEncoding: true, 
    stringSplitting: true,
    controlFlowFlattening: 0.75, 
    duplicateLiteralsRemoval: true,
    calculator: true, 
    dispatcher: true, 
    deadCode: true, 
    opaquePredicates: true,
    lock: { 
        selfDefending: true, 
        antiDebug: true, 
        integrity: true, 
        tamperProtection: true 
    }
});

const getUltraObfuscationConfig = () => {
    const generateUltraName = () => {
        const chars = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        return `z${numbers[Math.floor(Math.random() * numbers.length)]}${
            chars[Math.floor(Math.random() * chars.length)]
        }${Math.random().toString(36).substring(2, 6)}`;
    };
    return {
        target: "node", 
        compact: true, 
        renameVariables: true, 
        renameGlobals: true,
        identifierGenerator: generateUltraName,
        stringCompression: true, 
        stringEncoding: true, 
        stringSplitting: true,
        controlFlowFlattening: 0.9, 
        flatten: true, 
        shuffle: true, 
        rgf: true,
        deadCode: true, 
        opaquePredicates: true, 
        dispatcher: true,
        lock: { 
            selfDefending: true, 
            antiDebug: true, 
            integrity: true, 
            tamperProtection: true 
        }
    };
};

const getJapanObfuscationConfig = () => {
    const japaneseChars = [
        "あ","い","う","え","お","か","き","く","け","こ",
        "さ","し","す","せ","そ","た","ち","つ","て","と",
        "な","に","ぬ","ね","の","は","ひ","ふ","へ","ほ",
        "ま","み","む","め","も","や","ゆ","よ",
        "ら","り","る","れ","ろ","わ","を","ん"
    ];
    const generateJapaneseName = () => {
        let name = "";
        for (let i = 0; i < Math.floor(Math.random() * 4) + 3; i++) 
            name += japaneseChars[Math.floor(Math.random() * japaneseChars.length)];
        return name;
    };
    return {
        target: "node", 
        compact: true, 
        renameVariables: true, 
        renameGlobals: true,
        identifierGenerator: generateJapaneseName,
        stringEncoding: true, 
        stringSplitting: true,
        controlFlowFlattening: 0.9, 
        flatten: true, 
        shuffle: true,
        duplicateLiteralsRemoval: true, 
        deadCode: true, 
        calculator: true, 
        opaquePredicates: true,
        lock: { 
            selfDefending: true, 
            antiDebug: true, 
            integrity: true, 
            tamperProtection: true 
        }
    };
};

const getJapanxArabObfuscationConfig = () => {
    const japaneseXArabChars = [
        "あ","い","う","え","お","か","き","く","け","こ",
        "さ","し","す","せ","そ","た","ち","つ","て","と",
        "な","に","ぬ","ね","の","は","ひ","ふ","へ","ほ",
        "ま","み","む","め","も","や","ゆ","よ",
        "أ","ب","ت","ث","ج","ح","خ","د","ذ","ر",
        "ز","س","ش","ص","ض","ط","ظ","ع","غ","ف",
        "ق","ك","ل","م","ن","ه","و","ي",
        "ら","り","る","れ","ろ","わ","を","ん"
    ];
    const generateJapaneseXArabName = () => {
        let name = "";
        for (let i = 0; i < Math.floor(Math.random() * 4) + 3; i++) 
            name += japaneseXArabChars[Math.floor(Math.random() * japaneseXArabChars.length)];
        return name;
    };
    return {
        target: "node", 
        compact: true, 
        renameVariables: true, 
        renameGlobals: true,
        identifierGenerator: generateJapaneseXArabName,
        stringCompression: true, 
        stringConcealing: true, 
        stringEncoding: true, 
        stringSplitting: true,
        controlFlowFlattening: 0.95, 
        flatten: true, 
        shuffle: true, 
        rgf: false,
        dispatcher: true, 
        duplicateLiteralsRemoval: true, 
        deadCode: true,
        calculator: true, 
        opaquePredicates: true,
        lock: { 
            selfDefending: true, 
            antiDebug: true, 
            integrity: true, 
            tamperProtection: true 
        }
    };
};

const getMandarinObfuscationConfig = () => {
    const mandarinChars = [
        "龙","虎","风","云","山","河","天","地","雷","电",
        "火","水","木","金","土","星","月","日","光","影",
        "峰","泉","林","海","雪","霜","雾","冰","焰","石"
    ];
    const generateMandarinName = () => {
        let name = "";
        for (let i = 0; i < Math.floor(Math.random() * 4) + 3; i++) 
            name += mandarinChars[Math.floor(Math.random() * mandarinChars.length)];
        return name;
    };
    return {
        target: "node", 
        compact: true, 
        renameVariables: true, 
        renameGlobals: true,
        identifierGenerator: generateMandarinName,
        stringEncoding: true, 
        stringSplitting: true,
        controlFlowFlattening: 0.95, 
        shuffle: true, 
        duplicateLiteralsRemoval: true,
        deadCode: true, 
        calculator: true, 
        opaquePredicates: true,
        lock: { 
            selfDefending: true, 
            antiDebug: true, 
            integrity: true, 
            tamperProtection: true 
        }
    };
};

const getArabObfuscationConfig = () => {
    const arabicChars = [
        "أ","ب","ت","ث","ج","ح","خ","د","ذ","ر",
        "ز","س","ش","ص","ض","ط","ظ","ع","غ","ف",
        "ق","ك","ل","م","ن","ه","و","ي"
    ];
    const generateArabicName = () => {
        let name = "";
        for (let i = 0; i < Math.floor(Math.random() * 4) + 3; i++) 
            name += arabicChars[Math.floor(Math.random() * arabicChars.length)];
        return name;
    };
    return {
        target: "node", 
        compact: true, 
        renameVariables: true, 
        renameGlobals: true,
        identifierGenerator: generateArabicName,
        stringEncoding: true, 
        stringSplitting: true,
        controlFlowFlattening: 0.95, 
        shuffle: true, 
        duplicateLiteralsRemoval: true,
        deadCode: true, 
        calculator: true, 
        opaquePredicates: true,
        lock: { 
            selfDefending: true, 
            antiDebug: true, 
            integrity: true, 
            tamperProtection: true 
        }
    };
};

const getNewObfuscationConfig = () => ({
    target: "node", 
    compact: true, 
    renameVariables: true, 
    renameGlobals: true,
    identifierGenerator: "mangled",
    stringEncoding: true, 
    stringSplitting: true,
    controlFlowFlattening: 0.95, 
    shuffle: true, 
    duplicateLiteralsRemoval: true,
    deadCode: true, 
    calculator: true, 
    opaquePredicates: true,
    lock: { 
        selfDefending: true, 
        antiDebug: true, 
        integrity: true, 
        tamperProtection: true 
    }
});

const getCustomObfuscationConfig = (customName) => {
    const generateCustomName = () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let suffix = "";
        for (let i = 0; i < Math.floor(Math.random() * 3) + 2; i++) 
            suffix += chars[Math.floor(Math.random() * chars.length)];
        return `${customName}_${suffix}`;
    };
    return {
        target: "node", 
        compact: true, 
        renameVariables: true, 
        renameGlobals: true,
        identifierGenerator: generateCustomName,
        stringEncoding: true, 
        stringSplitting: true,
        controlFlowFlattening: 0.75, 
        shuffle: true, 
        duplicateLiteralsRemoval: true,
        deadCode: true, 
        opaquePredicates: true,
        lock: { 
            selfDefending: true, 
            antiDebug: true, 
            integrity: true, 
            tamperProtection: true 
        }
    };
};

const getObfuscationConfig = (level = "high") => ({
    target: "node",
    compact: true,
    renameVariables: true,
    renameGlobals: true,
    identifierGenerator: "mangled",
    stringEncoding: true,
    stringSplitting: true,
    controlFlowFlattening: level === "high" ? 0.95 : level === "medium" ? 0.75 : 0.5,
    shuffle: true,
    duplicateLiteralsRemoval: true,
    deadCode: true,
    calculator: true,
    opaquePredicates: true,
    lock: {
        selfDefending: true,
        antiDebug: true,
        integrity: true,
        tamperProtection: true
    }
});

// --- Invisible encode helper ---
function encodeInvisible(text) {
    try {
        const compressedText = text.replace(/\s+/g, ' ').trim();
        const base64Text = Buffer.from(compressedText).toString('base64');
        return '\u200B' + base64Text;
    } catch (e) {
        return Buffer.from(text).toString('base64');
    }
}

// ============= MAIN HANDLER =============
export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { 
            code, 
            mode, 
            days = 7, 
            intensity = 7, 
            size = 5, 
            customName = 'AlannXD',
            level = 'high'
        } = req.body;

        // Validate input
        if (!code) {
            return res.status(400).json({ error: 'No code provided' });
        }

        if (typeof code !== 'string') {
            return res.status(400).json({ error: 'Code must be a string' });
        }

        let obfuscatedCode = '';

        // ============ ENCRYPTION MODE SWITCH ============
        switch (mode) {
            // --- MAIN COMMANDS ---
            case 'enc':
                const encResult = await JsConfuser.obfuscate(code, getObfuscationConfig(level));
                obfuscatedCode = encResult.code || encResult;
                break;

            case 'enceval':
                const evalResult = await JsConfuser.obfuscate(code, getObfuscationConfig(level));
                obfuscatedCode = evalResult.code || evalResult;
                break;

            case 'customenc':
                const customResult = await JsConfuser.obfuscate(code, getCustomObfuscationConfig(customName));
                obfuscatedCode = customResult.code || customResult;
                break;

            case 'encmax':
                const maxResult = await JsConfuser.obfuscate(code, getMaxObfuscationConfig(intensity));
                obfuscatedCode = maxResult.code || maxResult;
                break;

            case 'encbig':
                const bigResult = await JsConfuser.obfuscate(code, getBigObfuscationConfig());
                let bigCode = bigResult.code || bigResult;
                const targetSizeBytes = (parseInt(size) || 5) * 1024 * 1024;
                const currentSizeBytes = Buffer.byteLength(bigCode, 'utf8');
                
                if (currentSizeBytes < targetSizeBytes) {
                    const paddingSize = targetSizeBytes - currentSizeBytes;
                    const padding = crypto.randomBytes(paddingSize).toString('base64');
                    bigCode += `\n/* Binary Padding (${paddingSize} bytes) */\n// ${padding}`;
                }
                obfuscatedCode = bigCode;
                break;

            // --- STYLE PACKS ---
            case 'encchina':
                const chinaResult = await JsConfuser.obfuscate(code, getMandarinObfuscationConfig());
                obfuscatedCode = chinaResult.code || chinaResult;
                break;

            case 'encarab':
                const arabResult = await JsConfuser.obfuscate(code, getArabObfuscationConfig());
                obfuscatedCode = arabResult.code || arabResult;
                break;

            case 'encjapan':
                const japanResult = await JsConfuser.obfuscate(code, getJapanObfuscationConfig());
                obfuscatedCode = japanResult.code || japanResult;
                break;

            case 'encjapxab':
                const japxabResult = await JsConfuser.obfuscate(code, getJapanxArabObfuscationConfig());
                obfuscatedCode = japxabResult.code || japxabResult;
                break;

            case 'encinvis':
                const invisResult = await JsConfuser.obfuscate(code, getInvisObfuscationConfig());
                obfuscatedCode = invisResult.code || invisResult;
                break;

            // --- POWER PACKS ---
            case 'encnebula':
                const nebulaResult = await JsConfuser.obfuscate(code, getNebulaObfuscationConfig());
                obfuscatedCode = nebulaResult.code || nebulaResult;
                break;

            case 'encnova':
                const novaResult = await JsConfuser.obfuscate(code, getNovaObfuscationConfig());
                obfuscatedCode = novaResult.code || novaResult;
                break;

            case 'encsiu':
                const siuResult = await JsConfuser.obfuscate(code, getSiuCalcrickObfuscationConfig());
                obfuscatedCode = siuResult.code || siuResult;
                break;

            case 'encx':
                const xResult = await JsConfuser.obfuscate(code, getXObfuscationConfig());
                const xCode = xResult.code || xResult;
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
                const newResult = await JsConfuser.obfuscate(code, getNewObfuscationConfig());
                obfuscatedCode = newResult.code || newResult;
                break;

            case 'encstealth':
                const stealthResult = await JsConfuser.obfuscate(code, getStealthObfuscationConfig());
                obfuscatedCode = stealthResult.code || stealthResult;
                break;

            case 'encstrong':
                const strongResult = await JsConfuser.obfuscate(code, getStrongObfuscationConfig());
                obfuscatedCode = strongResult.code || strongResult;
                break;

            case 'encultra':
                const ultraResult = await JsConfuser.obfuscate(code, getUltraObfuscationConfig());
                obfuscatedCode = ultraResult.code || ultraResult;
                break;

            case 'encquantum':
                obfuscatedCode = await obfuscateQuantum(code);
                break;

            case 'enclocked':
                obfuscatedCode = await obfuscateTimeLocked(code, days);
                break;

            // --- DEFAULT FALLBACK ---
            default:
                const defaultResult = await JsConfuser.obfuscate(code, getObfuscationConfig('high'));
                obfuscatedCode = defaultResult.code || defaultResult;
        }

        // Ensure string output
        if (typeof obfuscatedCode !== 'string') {
            obfuscatedCode = String(obfuscatedCode);
        }

        // Return success response
        return res.status(200).json({ 
            success: true,
            obfuscatedCode,
            mode,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        // Log error for debugging (Vercel will capture this)
        console.error('Encryption error:', {
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString()
        });

        // Return error response
        return res.status(500).json({ 
            success: false,
            error: error.message || 'Internal server error',
            mode: req.body?.mode || 'unknown'
        });
    }
}
