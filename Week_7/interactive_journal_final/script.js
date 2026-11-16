document.addEventListener('DOMContentLoaded', function() {
  const dateInput = document.getElementById('txDate');
  const refNoInput = document.getElementById('refNo');
  const descriptionInput = document.getElementById('description');
  const accountSelect = document.getElementById('account');
  const debitInput = document.getElementById('debit');
  const creditInput = document.getElementById('credit');

  const addRowBtn = document.getElementById('addRowBtn');
  const saveJournalBtn = document.getElementById('saveJournalBtn');
  const transactionTableBody = document.querySelector('#transactionTable tbody');

  // Kosongkan Credit jika Debit diisi, dan sebaliknya
  debitInput.addEventListener('input', function() {
    if (debitInput.value !== '') {
      creditInput.value = '';
    }
  });

  creditInput.addEventListener('input', function() {
    if (creditInput.value !== '') {
      debitInput.value = '';
    }
  });

  // Fungsi menambahkan baris transaksi ke tabel
  addRowBtn.addEventListener('click', function() {
    const txDate = dateInput.value;
    const refNo = refNoInput.value.trim();
    const description = descriptionInput.value.trim();
    const account = accountSelect.value;
    const debitVal = debitInput.value.trim();
    const creditVal = creditInput.value.trim();

    if (txDate === '' || refNo === '' || description === '' || account === '') {
      alert('Please complete Date, Ref. No., Description, and Account.');
      return;
    }

    const hasDebit = debitVal !== '' && parseFloat(debitVal) > 0;
    const hasCredit = creditVal !== '' && parseFloat(creditVal) > 0;

    // Validasi: hanya salah satu dari Debit atau Credit yang boleh terisi
    if ((hasDebit && hasCredit) || (!hasDebit && !hasCredit)) {
      alert('Please fill in either Debit or Credit (not both empty and not both filled).');
      return;
    }

    const newRow = document.createElement('tr');

    const dateCell = document.createElement('td');
    dateCell.textContent = txDate;

    const refCell = document.createElement('td');
    refCell.textContent = refNo;

    const descCell = document.createElement('td');
    descCell.textContent = description;

    const accountCell = document.createElement('td');
    accountCell.textContent = account;

    const debitCell = document.createElement('td');
    debitCell.className = 'amount';
    debitCell.textContent = hasDebit ? parseFloat(debitVal).toLocaleString('en-ID') : '0';

    const creditCell = document.createElement('td');
    creditCell.className = 'amount';
    creditCell.textContent = hasCredit ? parseFloat(creditVal).toLocaleString('en-ID') : '0';

    const actionCell = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';

    deleteBtn.addEventListener('click', function() {
      // Hapus elemen <tr> induk dari tombol Delete
      this.parentNode.parentNode.remove();
    });

    actionCell.appendChild(deleteBtn);

    newRow.appendChild(dateCell);
    newRow.appendChild(refCell);
    newRow.appendChild(descCell);
    newRow.appendChild(accountCell);
    newRow.appendChild(debitCell);
    newRow.appendChild(creditCell);
    newRow.appendChild(actionCell);

    transactionTableBody.appendChild(newRow);

    // Kosongkan input setelah berhasil ditambahkan
    dateInput.value = '';
    refNoInput.value = '';
    descriptionInput.value = '';
    accountSelect.value = '';
    debitInput.value = '';
    creditInput.value = '';
  });

  // Tombol Save Journal (Dummy)
  saveJournalBtn.addEventListener('click', function() {
    alert('Journal successfully saved! (Data is not persistent)');
    transactionTableBody.innerHTML = '';
  });
});