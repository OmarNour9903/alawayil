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
const url = "https://script.google.com/macros/s/AKfycbyoH8W-imWub0NjQnnjd5RTf7by0GgnN3G8ve4VLzphw2YHdp0A6P6d1M208Lnj6Uww/exec"; 

document.getElementById("uploadForm").addEventListener("submit", function (event) {
    event.preventDefault(); 

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
                let fileLink = document.getElementById("fileLink");
                fileLink.href = data.link;
                fileLink.textContent = "رابط الملف";
                fileLink.style.display = "block";
            } else {
                alert("حدث خطأ أثناء الرفع!");
            }
            document.getElementById("uploadForm").reset(); 
        })
        .catch(error => console.error("Error:", error));
    };
});


window.onload = function() {
    fetch("https://script.google.com/macros/s/AKfycbyoH8W-imWub0NjQnnjd5RTf7by0GgnN3G8ve4VLzphw2YHdp0A6P6d1M208Lnj6Uww/exec?source=main") // تأكد من إضافة ?source=main
      .catch(error => console.log("تم التتبع"));
};

window.onload = function() {
    fetch("https://omarnour9903.github.io/alawayil/about-us.html?source=internal") // تأكد من إضافة ?source=internal
      .catch(error => console.log("تم التتبع"));
};

const currentPage = window.location.href;
let source = "main";
if (currentPage.includes("https://omarnour9903.github.io/alawayil/about-us.html")) { // استبدل internal-page.html برابطك الداخلي
  source = "internal";
}
fetch(`https://script.google.com/macros/s/AKfycbyoH8W-imWub0NjQnnjd5RTf7by0GgnN3G8ve4VLzphw2YHdp0A6P6d1M208Lnj6Uww/exec?source=${source}`);