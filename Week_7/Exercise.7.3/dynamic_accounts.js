document.addEventListener('DOMContentLoaded', function() {
  const newAccountNameInput = document.getElementById('newAccountName');
  const addAccountButton = document.getElementById('addAccountBtn');
  const accountListElement = document.getElementById('accountList');

  // Fungsi untuk membuat item daftar akun baru
  function createAccountItem(accountName) {
    const listItem = document.createElement('li');
    listItem.textContent = accountName;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
      // 'this' merujuk pada tombol hapus yang diklik
      // this.parentNode adalah elemen induk li dari tombol hapus tersebut
      this.parentNode.remove();
    });

    listItem.appendChild(deleteButton);
    accountListElement.appendChild(listItem);
  }

  // Tambahkan event listener untuk tombol "Add Account"
  addAccountButton.addEventListener('click', function() {
    const accountName = newAccountNameInput.value.trim(); // .trim() untuk menghapus spasi di awal/akhir

    if (accountName !== "") {
      createAccountItem(accountName);
      newAccountNameInput.value = ""; // Kosongkan input setelah ditambahkan
    } else {
      alert("Account name cannot be empty!"); // Akan disempurnakan di Bab 8
    }
  });

  // Tambahkan tombol Delete untuk akun statis yang sudah ada saat halaman dimuat
  const staticAccounts = accountListElement.querySelectorAll('li');
  staticAccounts.forEach(function(item) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
      this.parentNode.remove();
    });
    item.appendChild(deleteButton);
  });
});