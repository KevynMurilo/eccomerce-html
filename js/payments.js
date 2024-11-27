function validateCreditCardForm() {
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;

    // Verifica se o número do cartão contém apenas números e espaços
    const cardNumberRegex = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
    if (!cardNumberRegex.test(cardNumber)) {
        alert('O número do cartão deve estar no formato: 0000 0000 0000 0000');
        return false;
    }

    // Validação adicional para a data de validade
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryDateRegex.test(expiryDate)) {
        alert('A data de validade deve estar no formato MM/AA.');
        return false;
    }

    // Verifica se o CVV é válido
    if (!/^\d{3}$/.test(cvv)) {
        alert('O CVV deve conter 3 dígitos.');
        return false;
    }

    alert('Dados do cartão validados com sucesso!');
    return true;
}
