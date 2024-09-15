export const processExtractedTextAadhar = (text) => {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    const nameRegex = /\b([A-Z][a-z]+)(\s[A-Z][a-z]+){0,4}\b/g;
    const dateRegex = /\b\d{4}-\d{2}-\d{2}\b|\b\d{2}\/\d{2}\/\d{4}\b/g;
    const genderMentionRegex = /\b(Male|Female|Other)\b/g;
    const aadhaarNumberRegex = /^\d{4}\s*\d{4}\s*\d{4}$/;
    const fatherNameRegex = /\bS\/[0O]:\s*([A-Za-z\s]+)\b/i; 
    const phoneNumberRegex = /\b\d{10}\b/;
    const pincodeRegex = /\b\d{6}\b/;

    let name = '';
    let dob = '';
    let gender = '';
    let aadhaarNumber = '';
    let fatherName = '';
    let address = '';
    let phoneNumber = '';
    let pincode = '';

    for (let i = 0; i < lines.length; i++) {
        if (dateRegex.test(lines[i])) {
            dob = lines[i].match(dateRegex)[0];
            if (i > 0 && nameRegex.test(lines[i - 1])) {
                name = lines[i - 1].match(nameRegex)[0];
            }
        }
    }

    const genderMatch = text.match(genderMentionRegex);
    if (genderMatch) gender = genderMatch[0];

    const aadhaarNumberMatch = lines.find(line => aadhaarNumberRegex.test(line));
    if (aadhaarNumberMatch) aadhaarNumber = aadhaarNumberMatch.match(aadhaarNumberRegex)[0];

    const fatherNameMatch = text.match(fatherNameRegex);
    if (fatherNameMatch) fatherName = fatherNameMatch[0].replace('S/O:', '').trim();

    if (fatherName) {
        const fatherNameIndex = lines.findIndex(line => line.includes(fatherName));
        if (fatherNameIndex !== -1) {
            for (let i = fatherNameIndex + 1; i < lines.length; i++) {
                if (phoneNumberRegex.test(lines[i])) break;
                address += lines[i] + ' ';
            }
            address = address.trim();
        }
    }

    const pincodeMatch = address.match(pincodeRegex);
    if (pincodeMatch) pincode = pincodeMatch[0];

    const phoneNumberMatch = text.match(phoneNumberRegex);
    if (phoneNumberMatch) phoneNumber = phoneNumberMatch[0];

    return {
        name,
        dob,
        gender,
        aadhaarNumber,
        fatherName,
        address,
        pincode,
        phoneNumber
    };
};


