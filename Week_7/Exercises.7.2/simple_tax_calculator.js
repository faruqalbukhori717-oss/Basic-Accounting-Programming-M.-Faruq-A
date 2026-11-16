document.addEventListener('DOMContentLoaded', function() {
  const incomeInput = document.getElementById('grossIncome');
  const dependentsInput = document.getElementById('numDependents');
  const calculateBtn = document.getElementById('calculateTaxBtn');
  const resultDiv = document.getElementById('taxResult');

  // Fungsi untuk memformat angka ke Rupiah
  function formatRupiah(number) {
    const formatter = new Intl.NumberFormat('en-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    return formatter.format(number);
  }

  function calculateTax() {
    const grossIncome = parseFloat(incomeInput.value);
    const numDependents = parseInt(dependentsInput.value);

    if (isNaN(grossIncome) || isNaN(numDependents) || grossIncome < 0 || numDependents < 0) {
      resultDiv.textContent = "Please enter valid numbers for income and dependents.";
      resultDiv.style.color = 'red';
      return;
    }

    let payableTax = 0;

    // Tarif Pajak Fiktif
    if (grossIncome <= 50000000) {
      payableTax = grossIncome * 0.05; // 5%
    } else if (grossIncome <= 250000000) {
      payableTax = (50000000 * 0.05) + ((grossIncome - 50000000) * 0.15); // 5% lapisan pertama + 15% lapisan kedua
    } else {
      payableTax = (50000000 * 0.05) + (200000000 * 0.15) + ((grossIncome - 250000000) * 0.25); // 5% + 15% + 25%
    }

    // Pengurangan Pajak Fiktif berdasarkan Tanggungan
    const reductionPerDependent = 500000;
    let totalReduction = numDependents * reductionPerDependent;
    payableTax = Math.max(0, payableTax - totalReduction); // Memastikan pajak tidak negatif

    const netIncome = grossIncome - payableTax;

    resultDiv.style.color = '#333';
    resultDiv.innerHTML = `
      <p><strong>Gross Income:</strong> ${formatRupiah(grossIncome)}</p>
      <p><strong>Number of Dependents:</strong> ${numDependents}</p>
      <p><strong>Estimated PPh Payable:</strong> ${formatRupiah(payableTax)}</p>
      <p><strong>Estimated Net Income:</strong> ${formatRupiah(netIncome)}</p>
    `;
  }

  // Tambahkan event listener ke tombol
  calculateBtn.addEventListener('click', calculateTax);
});