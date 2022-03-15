<template>
  <div>
    <footer>
      <ul class="ft-ul">
        <li class="ft-i">
          <a href="https://web.facebook.com/boonyawat.kwangta/"
            ><i class="fa fa-facebook-square"></i
          ></a>
        </li>
        <li class="ft-i">
          <a href="https://github.com/bean14546/CampingEquipmentStore.git"
            ><i class="fa fa-github-square"></i
          ></a>
        </li>
      </ul>

      <section class="credit">
        <h1 class="title"><b>Credit</b></h1>
        <p>
          นาย บุณยวัฒน์ กวางต๊ะ รหัสนักศึกษา 6204101327 ชั้นไปที่ 3
          สาขาวิชาวิทยาการคอมพิวเตอร์ คณะวิทยาศาสตร์ มหาวิทยาลัยแม่โจ้ จังหวัด
          เชียงใหม่ Website นี้ เป็น Project ประจำวิชา คพ495
          หัวข้อพิเศษทางวิทยาการคอมพิวเตอร์ 2 อาจารย์ผู้สอน อาจารย์ ดร.
          กิติศักดิ์ โอสถานันต์กุล
        </p>
        <hr />
      </section>
      <p>Copyright &copy; 2022</p>
    </footer>
  </div>
</template>

<style scoped>
/* Section Credit */
section.credit {
  font-family: "Kanit", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 100px 20px;
}
section .title {
  font: bold 25px fantasy;
  text-transform: capitalize;
  margin-bottom: 20px;
  color: #fff;
}
section.credit p {
  max-width: 800px;
  text-align: center;
  line-height: 2;
  padding: 0 20px;
  margin-bottom: 35px;
}
section.credit hr {
  width: 180px;
  height: 2px;
  background-color: #fff;
  border: 0;
}

/* Section Footer */
footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #414a4f;
  padding: 20px 0;
  color: #fff;
}
footer ul.ft-ul {
  display: flex;
  margin-bottom: 20px;
  font-size: 32px;
  padding: 0;
}
footer ul li.ft-i a {
  padding: 15px;
}
footer ul.ft-ul li.ft-i a {
  color: inherit;
  text-decoration: none;
  opacity: 0.9;
  color: #fff;
}
footer ul.ft-ul li.ft-i:first-child {
  margin-left: 0px;
}
footer ul.ft-ul li.ft-i:last-child {
  margin-right: 0;
}
</style>
