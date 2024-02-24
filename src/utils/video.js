const parseSrtFile = (downloadScript) => {
    const lines = downloadScript.split("\n\n");

    return lines.map(line => {
        const [serial, time, ...textLines] = line.split("\n").filter(Boolean);
        const [start, end] = time.split(" --> ");

        const cleanedTextLines = textLines.map(line => line.replace(/^>>\s*/, ''));
        const text = cleanedTextLines.join("\n");

        return { serial, start, end, text };
    });
};

export default {
    parseSrtFile
}