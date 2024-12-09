// Verileri saklayacak yerel depolama
let students = JSON.parse(localStorage.getItem('students')) || [];
let schools = JSON.parse(localStorage.getItem('schools')) || [];
let records = JSON.parse(localStorage.getItem('records')) || [];

// Kayıt olmak için
function registerStudent() {
    const name = document.getElementById('studentName').value;
    const surname = document.getElementById('studentSurname').value;
    const number = document.getElementById('studentNumber').value;
    const email = document.getElementById('studentEmail').value;
    const school = document.getElementById('studentSchool').value;
    const studentClass = document.getElementById('studentClass').value;

    const student = { name, surname, number, email, school, studentClass };
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));

    alert('Öğrenci kaydedildi!');
    showSection('main');
}

function registerSchool() {
    const name = document.getElementById('schoolName').value;
    const city = document.getElementById('schoolCity').value;
    const district = document.getElementById('schoolDistrict').value;
    const password = document.getElementById('schoolPassword').value;

    const school = { name, city, district, password };
    schools.push(school);
    localStorage.setItem('schools', JSON.stringify(schools));

    alert('Okul kaydedildi!');
    showSection('main');
}

// Veri girişini yapmak için
function loginSchool() {
    const schoolName = document.getElementById('entrySchoolName').value;
    const password = document.getElementById('entryPassword').value;
    const school = schools.find(s => s.name === schoolName && s.password === password);

    if (school) {
        document.getElementById('entryForm').style.display = 'block';
    } else {
        alert('Yanlış okul adı veya şifre');
    }
}

function addEntry() {
    const studentName = document.getElementById('entryStudentName').value;
    const studentNumber = document.getElementById('entryStudentNumber').value;
    const wasteType = document.getElementById('entryWasteType').value;
    const weight = document.getElementById('entryWeight').value;
    const recorder = document.getElementById('entryRecorder').value;

    // Öğrenci ve atık bilgilerini kaydet
    const record = { studentName, studentNumber, wasteType, weight, recorder };

    records.push(record);
    localStorage.setItem('records', JSON.stringify(records));

    alert('Veri eklendi!');
    showSection('main');
}

function viewData() {
    const email = document.getElementById('viewEmail').value;
    const studentNumber = document.getElementById('viewStudentNumber').value;
    
    const student = students.find(s => s.email === email && s.number == studentNumber);
    
    if (student) {
        const studentRecords = records.filter(r => r.studentNumber == studentNumber);
        
        if (studentRecords.length > 0) {
            const tableBody = document.getElementById('viewRecords');
            tableBody.innerHTML = '';
            
            studentRecords.forEach(record => {
                const row = document.createElement('tr');
                
                const credit = calculateCredit(record.weight, record.wasteType);
                
                row.innerHTML = `
                    <td>${record.wasteType}</td>
                    <td>${record.weight}</td>
                    <td>${credit}</td>
                    <td>${record.recorder}</td>
                `;
                
                tableBody.appendChild(row);
            });
            
            document.getElementById('viewTable').style.display = 'block';
        } else {
            alert('Bu öğrenciye ait kayıt bulunamadı!');
        }
    } else {
        alert('Öğrenci bulunamadı!');
    }
}

// Atık türüne göre kredi hesaplama
function calculateCredit(weight, wasteType) {
    let creditPerKg;
    switch (wasteType) {
        case 'Cam':
            creditPerKg = 1;
            break;
        case 'Kağıt':
            creditPerKg = 0.5;
            break;
        case 'Plastik':
            creditPerKg = 0.3;
            break;
        case 'Metal':
            creditPerKg = 1.5;
            break;
        case 'Pil':
            creditPerKg = 2;
            break;
        case 'Elektronik':
            creditPerKg = 3;
            break;
        case 'Yağ':
            creditPerKg = 2.5;
            break;
        case 'Tekstil':
            creditPerKg = 0.8;
            break;
        default:
            creditPerKg = 0;
    }
    return (weight * creditPerKg).toFixed(2);
}

// Sayfa geçişi
function showSection(id) {
    document.querySelectorAll('.content > div').forEach(div => div.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}
