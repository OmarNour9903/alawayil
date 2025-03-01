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

const URL = "https://script.googleusercontent.com/macros/echo?user_content_key=eqIHVGZTNOZbreAzdpa5vMXvikmZJNQwAbJAkLiUf5NEBzJBlpOAh7Zh7Mmt_78c9HdPNdkm9_ZjravdXs8Jg_9TVX_hwGjNm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKM35l339a2eYb-U4WKhl8TBnf4P2NuANJUw_yVDuHe8fKStN3QE60EXVho6FC8I9TMOMAe3w5XPXyCm28XLOhfVT6cnWde54A&lib=MbZ6Mul8rCZJS9Bn9Ve3B_iANBs6THuFY";

document.getElementById("uploadForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitBtn = event.target.querySelector('button[type="submit"]');
    
    try {
        // التحقق من الحقول الفارغة
        const requiredFields = event.target.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('invalid');
                isValid = false;
            }
        });
        
        if (!isValid) throw new Error('يرجى ملء جميع الحقول المطلوبة');

        // تعطيل الزر
        submitBtn.disabled = true;
        submitBtn.textContent = 'جاري الإرسال...';

        // معالجة الملف
        const file = document.getElementById("fileInput").files[0];
        const reader = new FileReader();
        
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            const base64 = reader.result.split("base64,")[1];
            
            const obj = {
                username: encodeURIComponent(document.getElementById("username").value),
                name: encodeURIComponent(document.getElementById("name").value),
                college: encodeURIComponent(document.getElementById("college").value),
                department: encodeURIComponent(document.getElementById("department").value),
                lectures: document.getElementById("lectures").value,
                price: document.getElementById("price").value,
                phone: document.getElementById("phone").value,
                base64: base64,
                type: file.type,
                filename: file.name
            };

            // الإرسال
            const response = await fetch(URL, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            });

            if (!response.ok) throw new Error('فشل في الإتصال بالخادم');
            
            const data = await response.json();
            if (data.error) throw new Error(data.error);
            
            document.getElementById("successMessage").style.display = "block";
            event.target.reset(); // إعادة تعيين النموذج
        };

    } catch (error) {
        alert(error.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'إرسال';
    }
});


window.onload = function() {
    fetch("https://script.google.com/macros/s/AKfycbymxqTZAGMwOKDD222LuTGkRpa2ZHvmbtXiqDplbiiAXKfqr9rMRnYLVBG4RcEulmg7/exec?source=main") // تأكد من إضافة ?source=main
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
fetch(`https://script.google.com/macros/s/AKfycbymxqTZAGMwOKDD222LuTGkRpa2ZHvmbtXiqDplbiiAXKfqr9rMRnYLVBG4RcEulmg7/exec?source=${source}`);