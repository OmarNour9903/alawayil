document.getElementById('phone').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^0-9]/g, '');
    if (!this.value.match(/^01[0-9]{9}$/)) {
        throw new Error('رقم الهاتف غير صحيح');
    }
});

document.getElementById('name').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^a-zA-Zأ-ي\s]/g, '');
});

document.getElementById('username').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^a-zA-Zأ-ي\s]/g, '');
});

document.getElementById('college').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^a-zA-Zأ-ي\s\-\/\\]/g, '');
});

document.getElementById('department').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^a-zA-Zأ-ي\s]/g, '');
});

// form 

let url = "https://script.google.com/macros/s/AKfycbzQaszf7VIAOsap446oenWtDPlCriRcsYfPwndzgjVMI9ejnxnqubsfsgMT_TbpvdJS/exec"; // 🔹 ضع رابط Google Apps Script هنا

document.getElementById("uploadForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let submitBtn = document.getElementById("submitBtn");
    let spinner = document.getElementById("spinner");
    submitBtn.disabled = true;
    spinner.style.display = "inline-block";

    let file = document.getElementById("fileInput").files[0];
    let username = document.getElementById("username").value;
    let name = document.getElementById("name").value;
    let college = document.getElementById("college").value;
    let department = document.getElementById("department").value;
    let lectures = document.getElementById("lectures").value;
    let price = document.getElementById("price").value;
    let phone = document.getElementById("phone").value;

    if (!file) {
        alert("يرجى اختيار ملف!");
        submitBtn.disabled = false;
        spinner.style.display = "none";
        return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
        let base64 = reader.result.split("base64,")[1];

        let obj = {
            username: username,
            name: name,
            college: college,
            department: department,
            lectures: lectures,
            price: price,
            phone: phone,
            base64: base64,
            type: file.type,
            filename: file.name
        };

        fetch(url, {
            method: "POST",
            body: JSON.stringify(obj)
        })
        .then(response => response.json())
        .then(data => {
            if (data.link) {
                alert("تم رفع البيانات بنجاح!");
                let successMessage = document.getElementById("successMessage");
                successMessage.style.display = "block";
            } else {
                alert("حدث خطأ أثناء الرفع!");
            }
            document.getElementById("uploadForm").reset();
            submitBtn.disabled = false;
            spinner.style.display = "none";
        })
        .catch(error => {
            console.error("Error:", error);
            submitBtn.disabled = false;
            spinner.style.display = "none";
        });
    };
});

window.onload = function() {
    fetch("https://script.google.com/macros/s/AKfycbzQaszf7VIAOsap446oenWtDPlCriRcsYfPwndzgjVMI9ejnxnqubsfsgMT_TbpvdJS/exec?source=main")
      .catch(error => console.log("تم تتبع الزائر الأساسي"));
  };

  window.onload = function() {
    fetch("https://omarnour9903.github.io/alawayil/about-us.html?source=internal")
      .catch(error => console.log("تم تتبع الزائر الداخلي"));
  };

