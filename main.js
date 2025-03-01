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

const URL = "AKfycbxw3zg4RFbwH4fmUHlTQ2EA5v8SF4m15wIrAjciBc-mDjkTIl7vN6ppHD_Si0SwIFHF/exec";

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

// ================ تتبع الزوار ================
window.onload = function() {
    // تحديد المصدر بناءً على الصفحة الحالية
    const currentPage = window.location.href;
    let source = "main"; // القيمة الافتراضية
    
    if (currentPage.includes("about-us.html")) { // استبدل بالرابط الداخلي الفعلي
    source = "internal";
    }

    // إرسال طلب التتبع
    fetch(`https://script.google.com/macros/s/your-script-id/exec?source=${source}`)
    .then(() => console.log(`تم تتبع الزائر كمصدر: ${source}`))
    .catch(error => console.error("حدث خطأ في التتبع:", error));
};