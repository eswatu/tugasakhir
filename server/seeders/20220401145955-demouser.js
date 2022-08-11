'use strict';
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');



module.exports = {
  
  async up(queryInterface, Sequelize) {
    
    //insert user
    await queryInterface.bulkInsert('Users', [{
      name: "Pegawai 1",
      username: "pegawai1",
      passwordHash: await bcrypt.hash("pegawai1", 10) ,
      role: "Admin",
      level: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      baseAngkre : 60
    },{
      name: "Martina Dwi P",
      username: "pegawai2",
      passwordHash: await bcrypt.hash("pegawai2", 10) ,
      role: "Penilai",
      level: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      baseAngkre : 100
    },{
      name: "Nathania K S",
      username: "pegawai3",
      passwordHash: await bcrypt.hash("pegawai3", 10) ,
      role: "User",
      level: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      baseAngkre : 80
    },{
      name: "Akbar",
      username: "pegawai4",
      passwordHash: await bcrypt.hash("pegawai4", 10) ,
      role: "User",
      level: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
      baseAngkre : 60
    },{
      name: "Fadlan",
      username: "pegawai5",
      passwordHash: await bcrypt.hash("pegawai5", 10) ,
      role: "User",
      level: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      baseAngkre : 80
    }]);
  //insert surat tugas
  await queryInterface.bulkInsert('AssignLetter',[{
    
  }]);
    //insert sub unsur
  await queryInterface.bulkInsert('SubUnsur', [
    {
      kodeUnsur: 1, namaUnsur: 'Penyuluhan dan Pengembangan Penyuluhan',
      kodeSub:'A', namaSubUnsur: "A. Penyuluhan Langsung Secara Aktif"
    },
    {
      kodeUnsur: 1, namaUnsur: 'Penyuluhan dan Pengembangan Penyuluhan',
      kodeSub:'B', namaSubUnsur: "B. Penyuluhan Langsung Secara Pasif"
    },{
      kodeUnsur: 1, namaUnsur: 'Penyuluhan dan Pengembangan Penyuluhan',
      kodeSub:'C',
      namaSubUnsur: "C. Penyuluhan Tidak Langsung Satu Arah"
    },{
      kodeUnsur: 1, namaUnsur: 'Penyuluhan dan Pengembangan Penyuluhan',
      kodeSub:'D', namaSubUnsur: "D. Penyuluhan Tidak Langsung Dua Arah"
    },{
      kodeUnsur: 1, namaUnsur: 'Penyuluhan dan Pengembangan Penyuluhan',
      kodeSub:'E', namaSubUnsur: "E. Penyuluhan Tidak Langsung Melalui Contact Center dan Penyelesaian Administrasi Perpajakan"
    },{
      kodeUnsur: 1, namaUnsur: 'Penyuluhan dan Pengembangan Penyuluhan',
      kodeSub: 'F', namaSubUnsur: "F. Penyuluhan Melalui Pihak Ketiga"
    },{
      kodeUnsur: 2, namaUnsur: 'Pengembangan Profesi',
      kodeSub: 'A', namaSubUnsur: 'Perolehan ijazah/gelar pendidikan formal sesuai dengan bidang tugas Jabatan Fungsional Asisten Penyuluh Pajak'
    },{
      kodeUnsur: 2, namaUnsur: 'Pengembangan Profesi',
      kodeSub: 'B', namaSubUnsur: 'Pembuatan Karya Tulis / KaryaIlmiah di bidang Jabatan Fungsional Asisten Penyuluh Pajak'
    },{
      kodeUnsur: 2, namaUnsur: 'Pengembangan Profesi',
      kodeSub: 'C', namaSubUnsur: 'Penerjemahan / Penyaduran Buku dan Bahan-Bahan Lain dibidang Jabatan Fungsional Asisten Penyuluh Pajak'
    },{
      kodeUnsur: 2, namaUnsur: 'Pengembangan Profesi',
      kodeSub:'D' , namaSubUnsur: 'Pembuatan Buku Pedoman/Petunjuk Pelaksanaan / Petunjuk Teknis di Bidang Jabatan Fungsional Asisten Penyuluh Pajak'
    },{
      kodeUnsur: 2, namaUnsur: 'Pengembangan Profesi',
      kodeSub: 'E', namaSubUnsur: 'Pengembangan Kompetensi di Bidang Jabatan Fungsional Asisten Penyuluh Pajak'
    },{
      kodeUnsur: 2, namaUnsur: 'Pengembangan Profesi',
      kodeSub: 'F', namaSubUnsur: 'Kegiatan lain yang mendukung pengembangan profesi yang ditetapkan oleh Instansi Pembina di bidang Jabatan Fungsional Asisten Penyuluh Pajak'
    },{
      kodeUnsur:3, namaUnsur: 'Penunjang Kegiatan Penyuluhan',
      kodeSub: 'A', namaSubUnsur: 'Pengajar / Pelatih di Bidang Jabatan Fungsional Asisten Penyuluh Pajak'
    },{
      kodeUnsur:3, namaUnsur: 'Penunjang Kegiatan Penyuluhan',
      kodeSub: 'B', namaSubUnsur: 'Keanggotaan dalam Tim Penilai / Tim Uji Kompetensi'
    },{
      kodeUnsur:3, namaUnsur: 'Penunjang Kegiatan Penyuluhan',
      kodeSub: 'C', namaSubUnsur: 'Perolehan Penghargaan'
    },{
      kodeUnsur:3, namaUnsur: 'Penunjang Kegiatan Penyuluhan',
      kodeSub: 'D', namaSubUnsur: 'Perolehan Gelar Kesarjanaan Lainnya yang tidak sesuai dengan bidang tugas Jabatan Fungsional Asisten Penyuluh Pajak'
    },{
      kodeUnsur:3, namaUnsur: 'Penunjang Kegiatan Penyuluhan',
      kodeSub: 'E', namaSubUnsur: 'Pelaksanaan tugas lain yang mendukung pelaksanaan tugas Jabatan Fungsional Asisten Penyuluh Pajak'
    }]);
    
    // insert aktivitas
  await queryInterface.bulkInsert('Aktivitas',[
            {
              kodeAkt: "A",
              namaAkt: "Persiapan Penyuluhan"
            },
            {
              kodeAkt: "B",
              namaAkt: "Penyelesaian Administrasi Perpajakan"
            },
            {
              kodeAkt: "C",
              namaAkt: "Menyusun Program Penyuluhan"
            },
            {
              kodeAkt: "D",
              namaAkt: "Menyusun Materi Penyuluhan"
            },
            {
                kodeAkt: "E",
                namaAkt: "Melaksanakan Penyuluhan"
          },
          {
            kodeAkt : "F",
            namaAkt : "Melaksanakan Evaluasi Dan Monitoring"
          },{
            kodeAkt:'G',
            namaAkt: 'Melaksanakan Kegiatan Penunjang'
          }
        ]);
    //insert Butir
    const subA1 = await db.SubUnsur.findOne({ where: { kodeSub: "A", kodeUnsur: 1 } });
    const subB1 = await db.SubUnsur.findOne({ where: { kodeSub: "B", kodeUnsur: 1  } });
    const subC1 = await db.SubUnsur.findOne({ where: { kodeSub: "C", kodeUnsur: 1  } });
    const subD1 = await db.SubUnsur.findOne({ where: { kodeSub: "D", kodeUnsur: 1  } });
    const subE1 = await db.SubUnsur.findOne({ where: { kodeSub: "E", kodeUnsur: 1  } });
    const subF1 = await db.SubUnsur.findOne({ where: { kodeSub: "F", kodeUnsur: 1  } });

    const subA2 = await db.SubUnsur.findOne({ where: { kodeSub: "A", kodeUnsur: 2 } });
    const subB2 = await db.SubUnsur.findOne({ where: { kodeSub: "B", kodeUnsur: 2  } });
    const subC2 = await db.SubUnsur.findOne({ where: { kodeSub: "C", kodeUnsur: 2  } });
    const subD2 = await db.SubUnsur.findOne({ where: { kodeSub: "D", kodeUnsur: 2  } });
    const subE2 = await db.SubUnsur.findOne({ where: { kodeSub: "E", kodeUnsur: 2  } });
    const subF2 = await db.SubUnsur.findOne({ where: { kodeSub: "F", kodeUnsur: 2  } });

    const subA3 = await db.SubUnsur.findOne({ where: { kodeSub: "A", kodeUnsur: 3 } });
    const subB3 = await db.SubUnsur.findOne({ where: { kodeSub: "B", kodeUnsur: 3  } });
    const subC3 = await db.SubUnsur.findOne({ where: { kodeSub: "C", kodeUnsur: 3  } });
    const subD3 = await db.SubUnsur.findOne({ where: { kodeSub: "D", kodeUnsur: 3  } });
    const subE3 = await db.SubUnsur.findOne({ where: { kodeSub: "E", kodeUnsur: 3  } });

    const aktA = await db.Aktivitas.findOne({ where: { kodeAkt: "A" } });
    const aktB = await db.Aktivitas.findOne({ where: { kodeAkt: "B" } });
    const aktC = await db.Aktivitas.findOne({ where: { kodeAkt: "C" } });
    const aktD = await db.Aktivitas.findOne({ where: { kodeAkt: "D" } });
    const aktE = await db.Aktivitas.findOne({ where: { kodeAkt: "E" } });
    const aktF = await db.Aktivitas.findOne({ where: { kodeAkt: "F" } });
    const aktG = await db.Aktivitas.findOne({ where: { kodeAkt: "G" } });

    await queryInterface.bulkInsert('Butir',[
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan pemberian informasi secara langsung kepada Bendaharawan",
        tkButir: "-",
        hasilKerja: "Laporan Pelaksanaan kegiatan",
        jmlPoin: 0.03,
        levelReq: 2
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktD.id,
        namaButir: "Menyusun materi Penyuluhan langsung secara aktif kepada Bendaharawan",
        tkButir: "-",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.18,
        levelReq: 6
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktC.id,
        namaButir: "Menyusun rencana kerja kegiatan Penyuluhan langsung secara aktif per kegiatan (session plan )",
        tkButir: "Tingkat II",
        hasilKerja: "Laporan Session Plan",
        jmlPoin: 0.12,
        levelReq: 4
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktC.id,
        namaButir: "Melaksanakan pemantauan persiapan kegiatan Penyuluhan langsung secara aktif",
        tkButir: "Tingkat II",
        hasilKerja: "Laporan Pemantauan Persiapan",
        jmlPoin: 0.04,
        levelReq: 4
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktC.id,
        namaButir: "Menyusun materi uji awal (pretest ) dan uji akhir (posttest ) kegiatan Penyuluhan langsung secara aktif",
        tkButir: "Tingkat II",
        hasilKerja: "Materi Soal",
        jmlPoin: 0.04,
        levelReq: 4
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktC.id,
        namaButir: "Menyusun instrumen survei kegiatan Penyuluhan langsung secara aktif",
        tkButir: "Tingkat II",
        hasilKerja: "Materi Survei",
        jmlPoin: 0.02,
        levelReq: 4
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktD.id,
        namaButir: "Menyusun materi Penyuluhan langsung secara aktif kepada calon Wajib Pajak Orang Pribadi",
        tkButir: "Tingkat II",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.36,
        levelReq: 4
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan pemberian informasi secara langsung kepada Wajib Pajak Badan terdaftar non Pengusaha Kena Pajak",
        tkButir: "Tingkat II",
        hasilKerja: "Laporan Pelaksanaan kegiatan",
        jmlPoin: 0.06,
        levelReq: 4
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan pemberian informasi secara langsung kepada Wajib Pajak Badan terdaftar Pengusaha Kena Pajak",
        tkButir: "Tingkat II",
        hasilKerja: "Laporan Pelaksanaan kegiatan",
        jmlPoin: 0.06,
        levelReq: 4
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktF.id,
        namaButir: "Melaksanakan monitoring  pelaksanaan kegiatan Penyuluhan langsung secara aktif",
        tkButir: "Tingkat II",
        hasilKerja: "Laporan Monitoring",
        jmlPoin: 0.06,
        levelReq: 4
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktD.id,
        namaButir: "Menyusun materi Penyuluhan langsung secara aktif kepadaWajib Pajak Orang Pribadi Asing",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.15,
        levelReq: 2
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktD.id,
        namaButir: "Menyusun materi Penyuluhan langsung secara aktif kepadaWajib Pajak Orang Pribadi terdaftar Pengusaha Kena Pajak",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.15,
        levelReq: 2
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan pemberian informasi secara langsung kepada Wajib Pajak Orang Pribadi Asing tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Pelaksanaan kegiatan",
        jmlPoin: 0.03,
        levelReq: 2
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan pemberian informasi secara langsung kepada Wajib Pajak Orang Pribadi terdaftar Pengusaha Kena Pajak tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Pelaksanaan kegiatan",
        jmlPoin: 0.03,
        levelReq: 2
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan pemberian informasi secara langsung kepada Wajib Pajak Badan terdaftar Pengusaha Kena Pajak",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Pelaksanaan kegiatan",
        jmlPoin: 0.03,
        levelReq: 2
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktC.id,
        namaButir: "Menyusun rencana kerja kegiatan Penyuluhan langsung secara aktif per kegiatan (session plan )",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Session Plan",
        jmlPoin: 0.12,
        levelReq: 4
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktC.id,
        namaButir: "Melaksanakan pemantauan persiapan kegiatan Penyuluhan langsung secara aktif",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Pemantauan Persiapan",
        jmlPoin: 0.04,
        levelReq: 4
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktC.id,
        namaButir: "Menyusun materi uji awal (pretest ) dan uji akhir (posttest ) kegiatan Penyuluhan langsung secara aktif",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Soal",
        jmlPoin: 0.04,
        levelReq: 4
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktC.id,
        namaButir: "Menyusun instrumen survei kegiatan Penyuluhan langsung secara aktif",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Survei",
        jmlPoin: 0.02,
        levelReq: 4
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktD.id,
        namaButir: "Menyusun materi Penyuluhan langsung secara aktif kepadaWajib Pajak Orang Pribadi penentu penerimaan/prominen \n(subjek penentu penerimaan/high influence subject )",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.1,
        levelReq: 4
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktD.id,
        namaButir: "Menyusun materi Penyuluhan langsung secara aktif kepadaWajib Pajak Badan Khusus (Bentuk Usaha Tetap/Joint\nVenture/Joint Operation /dan sebagainya)",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.1,
        levelReq: 4
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktD.id,
        namaButir: "Melaksanakan review terhadap materi Penyuluhan\nlangsung secara aktif",
        tkButir: "Tingkat III",
        hasilKerja: "Lembar Persetujuan",
        jmlPoin: 0.12,
        levelReq: 4
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan pemberian informasi secara langsung kepada Wajib Pajak Orang Pribadi penentu penerimaan/prominen (subjek penentu penerimaan/high influence subject ) tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Pelaksanaan kegiatan",
        jmlPoin: 0.06,
        levelReq: 4
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktD.id,
        namaButir: "Menyusun materi Penyuluhan langsung secara aktif kepada calon Wajib Pajak Orang Pribadi",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.06,
        levelReq: 1
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktD.id,
        namaButir: "Menyusun materi Penyuluhan langsung secara aktif kepada Wajib Pajak Orang Pribadi Baru",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.06,
        levelReq: 1
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktD.id,
        namaButir: "Menyusun materi Penyuluhan langsung secara aktif kepadaWajib Pajak Orang Pribadi terdaftar non Pengusaha Kena Pajak",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.06,
        levelReq: 1
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktD.id,
        namaButir: "Menyusun materi Penyuluhan langsung secara aktif kepadacalon Wajib Pajak Badan",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.06,
        levelReq: 1
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktD.id,
        namaButir: "Menyusun materi Penyuluhan langsung secara aktif kepadaWajib Pajak Badan baru",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.06,
        levelReq: 1
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktD.id,
        namaButir: "Menyusun materi Penyuluhan langsung secara aktif kepada Wajib Pajak Badan terdaftar non Pengusaha Kena Pajak",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.06,
        levelReq: 1
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktD.id,
        namaButir: "Menyusun materi Penyuluhan langsung secara aktif kepadaWajib Pajak Badan terdaftar Pengusaha Kena Pajak",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.06,
        levelReq: 1
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan pemberian informasi secara langsung kepada Calon Wajib Pajak Orang Pribadi tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Pelaksanaan kegiatan",
        jmlPoin: 0.008,
        levelReq: 1
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan pemberian informasi secara langsung kepada Wajib Pajak Orang Pribadi baru tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Pelaksanaan kegiatan",
        jmlPoin: 0.008,
        levelReq: 1
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan pemberian informasi secara langsung kepada Wajib Pajak Orang Pribadi terdaftar non Pengusaha Kena Pajak tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Pelaksanaan kegiatan",
        jmlPoin: 0.008,
        levelReq: 1
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan pemberian informasi secara langsung kepada Calon Wajib Pajak Badan tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Pelaksanaan kegiatan",
        jmlPoin: 0.012,
        levelReq: 1
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan pemberian informasi secara langsung kepada Wajib Pajak Badan baru tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Pelaksanaan kegiatan",
        jmlPoin: 0.012,
        levelReq: 1
      },
      {
        SubUnsurId: subA1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan pemberian informasi secara langsung kepada Wajib Pajak Badan terdaftar non Pengusaha Kena Pajak",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Pelaksanaan kegiatan",
        jmlPoin: 0.012,
        levelReq: 1
      },
      {
        SubUnsurId: subB1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan piket kegiatan Penyuluhan langsung secara pasif",
        tkButir: "Tingkat II",
        hasilKerja: "Laporan Piket",
        jmlPoin: 0.06,
        levelReq: 4
      },
      {
        SubUnsurId: subB1.id,
        AktivitaId: aktE.id,
        namaButir: "Memberikan konsultasi/bimbingan teknis secara langsung",
        tkButir: "Tingkat II",
        hasilKerja: "Berita Acara Konsultasi",
        jmlPoin: 0.02,
        levelReq: 4
      },
      {
        SubUnsurId: subB1.id,
        AktivitaId: aktF.id,
        namaButir: "Melaksanakan monitoring  pelaksanaan kegiatan Penyuluhan langsung secara pasif",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Monitoring",
        jmlPoin: 0.06,
        levelReq: 4
      },
      {
        SubUnsurId: subB1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan piket kegiatan Penyuluhan langsung secara pasif",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Piket",
        jmlPoin: 0.016,
        levelReq: 7
      },
      {
        SubUnsurId: subB1.id,
        AktivitaId: aktE.id,
        namaButir: "Memberikan konsultasi/bimbingan teknis secara langsung",
        tkButir: "Tingkat III",
        hasilKerja: "Berita Acara Konsultasi",
        jmlPoin: 0.004,
        levelReq: 7
      },
      {
        SubUnsurId: subC1.id,
        AktivitaId: aktC.id,
        namaButir: "Menyusun rencana kerja kegiatan Penyuluhan tidak langsung satu arah per kegiatan (session plan )",
        tkButir: "Tingkat II",
        hasilKerja: "Laporan Session Plan",
        jmlPoin: 0.04,
        levelReq: 4
      },
      {
        SubUnsurId: subD1.id,
        AktivitaId: aktC.id,
        namaButir: "Melaksanakan pemantauan persiapan kegiatan Penyuluhan tidak langsung satu arah",
        tkButir: "Tingkat II",
        hasilKerja: "Laporan Pemantauan Persiapan",
        jmlPoin: 0.04,
        levelReq: 4
      },
      {
        SubUnsurId: subD1.id,
        AktivitaId: aktD.id,
        namaButir: "Menyusun materi Penyuluhan tidak langsung satu arah melalui audio tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.075,
        levelReq: 2
      },
      {
        SubUnsurId: subD1.id,
        AktivitaId: aktD.id,
        namaButir: "Menyusun materi Penyuluhan tidak langsung satu arah melalui audio dan/atau visual tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.12,
        levelReq: 2
      },
      {
        SubUnsurId: subD1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan kegiatan Penyuluhan tidak langsung satu arah dalam bentuk audio tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Berita Acara Penyuluhan",
        jmlPoin: 0.12,
        levelReq: 2
      },
      {
        SubUnsurId: subD1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan kegiatan Penyuluhan tidak langsung satu arah dalam bentuk audio dan/atau visual tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Berita Acara Penyuluhan",
        jmlPoin: 0.24,
        levelReq: 2
      },
      {
        SubUnsurId: subD1.id,
        AktivitaId: aktC.id,
        namaButir: "Menyusun rencana kerja kegiatan Penyuluhan tidak langsung satu arah per kegiatan (session plan )",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Session Plan",
        jmlPoin: 0.04,
        levelReq: 4
      },
      {
        SubUnsurId: subD1.id,
        AktivitaId: aktC.id,
        namaButir: "Melaksanakan pemantauan persiapan kegiatan Penyuluhan tidak langsung satu arah",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Pemantauan Persiapan",
        jmlPoin: 0.04,
        levelReq: 4
      },
      {
        SubUnsurId: subD1.id,
        AktivitaId: aktD.id,
        namaButir: "Melaksanakan review terhadap materi Penyuluhan tidak langsung tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Lembar Persetujuan",
        jmlPoin: 0.04,
        levelReq: 4
      },
      {
        SubUnsurId: subD1.id,
        AktivitaId: aktC.id,
        namaButir: "Menyusun rencana kerja kegiatan Penyuluhan tidak langsung dua arah per kegiatan (session plan )",
        tkButir: "Tingkat II",
        hasilKerja: "Laporan Session Plan",
        jmlPoin: 0.06,
        levelReq: 4
      },
      {
        SubUnsurId: subD1.id,
        AktivitaId: aktC.id,
        namaButir: "Melaksanakan pemantauan persiapan kegiatan Penyuluhan tidak langsung dua arah",
        tkButir: "Tingkat II",
        hasilKerja: "Laporan Pemantauan Persiapan",
        jmlPoin: 0.04,
        levelReq: 4
      },
      {
        SubUnsurId: subD1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan kegiatan Penyuluhan tidak langsung dua arah dalam bentuk audio tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Berita Acara Penyuluhan",
        jmlPoin: 0.06,
        levelReq: 2
      },
      {
        SubUnsurId: subD1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan kegiatan Penyuluhan tidak langsung dua arah dalam bentuk audio dan/atau visual tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Berita Acara Penyuluhan",
        jmlPoin: 0.12,
        levelReq: 2
      },
      {
        SubUnsurId: subD1.id,
        AktivitaId: aktC.id,
        namaButir: "Menyusun rencana kerja kegiatan Penyuluhan tidak langsung dua arah per kegiatan (session plan )",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Session Plan",
        jmlPoin: 0.06,
        levelReq: 4
      },
      {
        SubUnsurId: subD1.id,
        AktivitaId: aktC.id,
        namaButir: "Melaksanakan pemantauan persiapan kegiatan Penyuluhan tidak langsung dua arah",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Pemantauan Persiapan",
        jmlPoin: 0.04,
        levelReq: 4
      },
      {
        SubUnsurId: subD1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan review terhadap materi Penyuluhan tidak langsung dua arah tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Lembar Persetujuan",
        jmlPoin: 0.04,
        levelReq: 4
      },
      {
        SubUnsurId: subD1.id,
        AktivitaId: aktD.id,
        namaButir: "Menyusun materi Penyuluhan tidak langsung dua arah melalui audio tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.032,
        levelReq: 1
      },
      {
        SubUnsurId: subD1.id,
        AktivitaId: aktD.id,
        namaButir: "Menyusun materi Penyuluhan tidak langsung dua arah melalui audio dan/atau visual tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.048,
        levelReq: 1
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktA.id,
        namaButir: "Menyusun rencana kerja kegiatan Penyuluhan periodik (outbound)",
        tkButir: "-",
        hasilKerja: "Laporan Rencana Kerja",
        jmlPoin: 0.025,
        levelReq: 2
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktA.id,
        namaButir: "Menyusun materi survei melalui media",
        tkButir: "-",
        hasilKerja: "Materi Survei",
        jmlPoin: 0.0267,
        levelReq: 2
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktA.id,
        namaButir: "Menyusun materi Penyuluhan perpajakan",
        tkButir: "-",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.04,
        levelReq: 2
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktA.id,
        namaButir: "Menyusun panduan komunikasi dan panduan kegiatan penjaminan kualitas layanan",
        tkButir: "-",
        hasilKerja: "Laporan Internalisasi bahan panduan",
        jmlPoin: 0.03,
        levelReq: 2
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktA.id,
        namaButir: "Menganalisis dan menyusun konsep jawaban yang ditanyakan oleh Penyuluh Pajak atas pertanyaan Wajib Pajak dan/atau masyarakat terkait informasi umum perpajakan dan/atau petunjuk penggunaan aplikasi perpajakan",
        tkButir: "-",
        hasilKerja: "Daftar Konsep Jawabanm",
        jmlPoin: 0.0011,
        levelReq: 2
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktA.id,
        namaButir: "Melaksanakan inventarisasi dan mendokumentasikan pertanyaan Penyuluh Pajak di aplikasi sistem informasi contact center",
        tkButir: "-",
        hasilKerja: "Laporan Internalisasi bahan panduan",
        jmlPoin: 0.0009,
        levelReq: 2
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Menelaah dan melaksanakan penyesuaian jadwal pemberian dan penyampaian layanan",
        tkButir: "-",
        hasilKerja: "Laporan Penyesuaian Jadwal",
        jmlPoin: 0.0117,
        levelReq: 2
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan pemberian dan/atau penyampaian informasi perpajakan, penerimaan pengaduan,  dan/ataupetunjuk penggunaan aplikasi perpajakan melalui media selain telepon",
        tkButir: "-",
        hasilKerja: "Laporan Pelaksanaan kegiatan",
        jmlPoin: 0.0023,
        levelReq: 2
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Menganalisis dan menindaklanjuti pengaduan Wajib Pajak dan/atau masyarakat yang disampaikan",
        tkButir: "-",
        hasilKerja: "Laporan Hasil Analisa Pengaduan",
        jmlPoin: 0.0004,
        levelReq: 2
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan konfirmasi awal atas pengaduan dan/atau eskalasi Wajib Pajak dan/atau masyarakat yang disampaikan",
        tkButir: "-",
        hasilKerja: "Rekaman Media",
        jmlPoin: 0.0078,
        levelReq: 2
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan analisis dan mendokumentasikan pengaduan Wajib Pajak dan/atau masyarakat ke dalam sistem informasi pengaduan",
        tkButir: "-",
        hasilKerja: "Dokumentasi Sistem Informasi Pengaduan",
        jmlPoin: 0.001,
        levelReq: 2
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan asistensi Penyuluh Pajak yang baru bergabung di contact center  (tandem)",
        tkButir: "-",
        hasilKerja: "Laporan Pelaksanaan Asistensi",
        jmlPoin: 0.01,
        levelReq: 2
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Melakukan pengolahan data panggilan keluar kepada Wajib Pajak dan/atau masyarakat (outbound )",
        tkButir: "-",
        hasilKerja: "Laporan Pengolahan data panggilan keluar",
        jmlPoin: 0.0125,
        levelReq: 2
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan penyampaian konfirmasi lanjutan  hasil tindak lanjut pengelolaan pengaduan di bidang perpajakan",
        tkButir: "-",
        hasilKerja: "Rekaman Media",
        jmlPoin: 0.0085,
        levelReq: 2
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Menindaklanjuti pertanyaan Wajib Pajak dan/atau masyarakat terkait informasi perpajakan dan/atau petunjuk penggunaan aplikasi perpajakan yang belum terjawab (eskalasi) ke direktorat terkait",
        tkButir: "-",
        hasilKerja: "surat",
        jmlPoin: 0.0725,
        levelReq: 2
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan penyampaian jawaban atas pertanyaan Wajib Pajak dan/atau masyarakat yang belum terjawab (eskalasi)",
        tkButir: "-",
        hasilKerja: "laporan",
        jmlPoin: 0.0054,
        levelReq: 2
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan pendampingan Penyuluh Pajak dalam rangka pemberian/penyampaian layanan",
        tkButir: "-",
        hasilKerja: "laporan pendampingan",
        jmlPoin: 0.01,
        levelReq: 2
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan proses pembahasan bersama (kalibrasi) di internal seksi",
        tkButir: "-",
        hasilKerja: "berita acara pembahasan",
        jmlPoin: 0.0147,
        levelReq: 2
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan penilaian kualitas layanan informasi dan pengaduan",
        tkButir: "-",
        hasilKerja: "laporan hasil penilaian",
        jmlPoin: 0.0157,
        levelReq: 2
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Menganalisis hasil penilaian kualitas pemberian/penyampaian layanan secara periodik",
        tkButir: "-",
        hasilKerja: "laporan hasil penilaian periodik",
        jmlPoin: 0.006,
        levelReq: 2
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan inventarisasi dan menganalisis hasil eskalasi secara periodik",
        tkButir: "-",
        hasilKerja: "laporan hasil eskalasi periodik",
        jmlPoin: 0.0725,
        levelReq: 2
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan inventarisasi dan menganalisis tindakan pengaduan yang telah diselesaikan secara periodik",
        tkButir: "-",
        hasilKerja: "laporan hasil analisis pengaduan periodik",
        jmlPoin: 0.0242,
        levelReq: 2
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktF.id,
        namaButir: "Melaksanakan analisis dan memberikan persetujuan atau penolakan atas pengajuan keberatan hasil penilaian kualitas layanan",
        tkButir: "-",
        hasilKerja: "rekomendasi teknis",
        jmlPoin: 0.0128,
        levelReq: 2
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktF.id,
        namaButir: "Melaksanakan evaluasi atas layanan panggilan masuk ataupanggilan keluar melalui media telepon dan nontelepon",
        tkButir: "-",
        hasilKerja: "laporan evaluasi kinerja tim operasional",
        jmlPoin: 0.0394,
        levelReq: 2
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktA.id,
        namaButir: "Melakukan review materi Penyuluhan perpajakan",
        tkButir: "-",
        hasilKerja: "Laporan Review",
        jmlPoin: 0.02,
        levelReq: 4
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Menyusun konsep usulan  pengembangan aplikasi pusat interaksi (contact center ) dalam rangka menunjang kegiatan pelayanan dengan pihak internal dan/atau eksternal",
        tkButir: "-",
        hasilKerja: "surat usulan",
        jmlPoin: 0.044,
        levelReq: 4
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Menganalisis dan menyusun daftar pertanyaan ke unit kerja atas permasalahan pemberian layanan",
        tkButir: "-",
        hasilKerja: "surat/nota dinas penyampaian daftar pertanyaan",
        jmlPoin: 0.02,
        levelReq: 4
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktF.id,
        namaButir: "Melaksanakan  evaluasi atas layanan bagian pengaduan/penjaminan kualitas",
        tkButir: "-",
        hasilKerja: "laporan evaluasi kinerja tim pengaduan/penjaminan kualitas",
        jmlPoin: 0.03,
        levelReq: 4
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktF.id,
        namaButir: "Melaksanakan pemantauan langsung (live monitoring ) atas pemberian dan/atau penyampaian informasi perpajakan, penerimaan pengaduan, permintaan transaksi perpajakan,dan/atau petunjuk penggunaan aplikasi perpajakan yang disampaikan melalui media",
        tkButir: "-",
        hasilKerja: "laporan pemantauan langsung",
        jmlPoin: 0.0207,
        levelReq: 6
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan jadwal interaksi (online )",
        tkButir: "-",
        hasilKerja: "Laporan piket Interaksi",
        jmlPoin: 0.004,
        levelReq: 7
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan koordinasi dengan pihak internal dan eksternal dalam rangka pelaksanaan operasional pusat interaksi (contact center )",
        tkButir: "-",
        hasilKerja: "laporan koordinasi",
        jmlPoin: 0.0081,
        levelReq: 7
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktF.id,
        namaButir: "Menyusun tanggapan teknis atas hasil penilaian kualitas layanan",
        tkButir: "-",
        hasilKerja: "tanggapan dalam aplikasi",
        jmlPoin: 0.0051,
        levelReq: 7
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan survei melalui media",
        tkButir: "-",
        hasilKerja: "Rekaman Media",
        jmlPoin: 0.0003,
        levelReq: 1
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Mendokumentasikan pemberian dan/atau penyampaian informasi perpajakan, penerimaan pengaduan, permintaan transaksi perpajakan dan/atau petunjuk penggunaan aplikasi perpajakan melalui media ke dalam aplikasi",
        tkButir: "-",
        hasilKerja: "Dokumentasi Aplikasi CRM",
        jmlPoin: 0.0002,
        levelReq: 3
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Melakukan sosialisasi ketentuan/aplikasi perpajakan",
        tkButir: "Narasumber",
        hasilKerja: "Jam Pelatihan",
        jmlPoin: 0.01,
        levelReq: 6
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Melakukan sosialisasi ketentuan/aplikasi perpajakan",
        tkButir: "Peserta",
        hasilKerja: "Jam Pelatihan",
        jmlPoin: 0.0047,
        levelReq: 7
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktB.id,
        namaButir: "Melaksanakan penyelesaian administrasi perpajakan",
        tkButir: "Tingkat I",
        hasilKerja: "laporan penelitian permohonan perpajakan",
        jmlPoin: 0.04,
        levelReq: 2
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan pemberian informasi perpajakan perpajakan, penerimaan pengaduan dan/atau pemberian petunjuk penggunaan aplikasi perpajakan melalui media telepon berdasarkan permintaan masyarakat/Wajib Pajak (inbound)",
        tkButir: "Tingkat I",
        hasilKerja: "Laporan Rekaman Media",
        jmlPoin: 0.0042,
        levelReq: 4
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan penyampaian informasi perpajakan dan/atau petunjuk penggunaan aplikasi perpajakan melalui media telepon berdasarkan kebutuhan organisasi (outbound )",
        tkButir: "Tingkat I",
        hasilKerja: "Laporan Rekaman Media",
        jmlPoin: 0.0017,
        levelReq: 4
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan penyampaian pengetahuan (transfer of knowledge ) kepada fungsional lain",
        tkButir: "Tingkat I",
        hasilKerja: "Laporan Hasil Pelaksanaan Penyampaian Pengetahuan",
        jmlPoin: 0.0106,
        levelReq: 6
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan pemberian informasi perpajakan perpajakan, penerimaan pengaduan dan/atau pemberian petunjuk penggunaan aplikasi perpajakan melalui media telepon berdasarkan permintaan masyarakat/Wajib Pajak (inbound)",
        tkButir: "Tingkat II",
        hasilKerja: "Laporan Rekaman Media",
        jmlPoin: 0.0021,
        levelReq: 2
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan penyampaian informasi perpajakan dan/atau petunjuk penggunaan aplikasi perpajakan melalui media telepon berdasarkan kebutuhan organisasi (outbound )",
        tkButir: "Tingkat II",
        hasilKerja: "Laporan Rekaman Media",
        jmlPoin: 0.0008,
        levelReq: 2
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktB.id,
        namaButir: "Melaksanakan penyelesaian administrasi perpajakan",
        tkButir: "Tingkat II",
        hasilKerja: "laporan penelitian permohonan perpajakan",
        jmlPoin: 0.015,
        levelReq: 2
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan penyampaian pengetahuan (transfer of knowledge ) kepada fungsional lain",
        tkButir: "Tingkat II",
        hasilKerja: "Laporan Hasil Pelaksanaan Penyampaian Pengetahuan",
        jmlPoin: 0.0041,
        levelReq: 7
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan pemberian informasi perpajakan perpajakan, penerimaan pengaduan dan/atau pemberian petunjuk penggunaan aplikasi perpajakan melalui media telepon berdasarkan permintaan masyarakat/Wajib Pajak (inbound)",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Rekaman Media",
        jmlPoin: 0.0007,
        levelReq: 1
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktE.id,
        namaButir: "Melaksanakan penyampaian informasi perpajakan dan/atau petunjuk penggunaan aplikasi perpajakan melalui media telepon berdasarkan kebutuhan organisasi (outbound )",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Rekaman Media",
        jmlPoin: 0.0003,
        levelReq: 1
      },
      {
        SubUnsurId: subE1.id,
        AktivitaId: aktB.id,
        namaButir: "Melaksanakan penyelesaian administrasi perpajakan",
        tkButir: "Tingkat III",
        hasilKerja: "laporan penelitian permohonan perpajakan",
        jmlPoin: 0.0007,
        levelReq: 1
      },
      {
        SubUnsurId: subF1.id,
        AktivitaId: aktC.id,
        namaButir: "Melakukan pemantauan persiapan kegiatan dalam rangka pelatihan pihak ketiga",
        tkButir: "Tingkat II",
        hasilKerja: "Laporan Pemantauan Persiapan",
        jmlPoin: 0.06,
        levelReq: 4
      },
      {
        SubUnsurId: subF1.id,
        AktivitaId: aktD.id,
        namaButir: "Menyusun materi uji awal (pre test ) dan uji akhir (post test ) dalam rangka pelatihan pihak ketiga",
        tkButir: "Tingkat II",
        hasilKerja: "Materi Soal",
        jmlPoin: 0.13,
        levelReq: 4
      },
      {
        SubUnsurId: subF1.id,
        AktivitaId: aktC.id,
        namaButir: "Melakukan pemantauan persiapan kegiatan dalam rangka pelatihan pihak ketiga",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Pemantauan Persiapan",
        jmlPoin: 0.06,
        levelReq: 4
      },
      {
        SubUnsurId: subF1.id,
        AktivitaId: aktD.id,
        namaButir: "Menyusun materi uji awal (pre test ) dan uji akhir (post test ) dalam rangka pelatihan pihak ketiga",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Soal",
        jmlPoin: 0.13,
        levelReq: 4
      },
        {
            SubUnsurId: subA2.id,
            AktivitaId: aktG.id,
            namaButir: "Memperoleh ijazah sesuai dengan bidang tugas Jabatan Fungsional Asisten Penyuluh Pajak",
            tkButir: "-",
            hasilKerja: "Ijazah/Gelar",
            jmlPoin: "25% AK Kenaikan Pangkat",
            levelReq: 7
        },
        {
            SubUnsurId: subB2.id,
            AktivitaId: aktG.id,
            namaButir: "Membuat karya tulis / karya ilmiah hasil penelitian /pengkajian /survei / evaluasi di bidang Jabatan Fungsional Asisten Penyuluh Pajak yang dipublikasikan dalam bentuk buku/majalah ilmiah internasional",
            tkButir: "diterbitkan internasional yang terindek",
            hasilKerja: "Jurnal/Buku",
            jmlPoin: 20,
            levelReq: 7
        },
        {
            SubUnsurId: subB2.id,
            AktivitaId: aktG.id,
            namaButir: "Membuat karya tulis / karya ilmiah hasil penelitian /pengkajian /survei / evaluasi di bidang Jabatan Fungsional Asisten Penyuluh Pajak yang dipublikasikan dalam bentuk buku/majalah ilmiah internasional",
            tkButir: "diterbitkan nasional",
            hasilKerja: "Jurnal/Buku",
            jmlPoin: 12.5,
            levelReq: 7
        },
        {
            SubUnsurId: subB2.id,
            AktivitaId: aktG.id,
            namaButir: "Membuat karya tulis / karya ilmiah hasil penelitian /pengkajian /survei / evaluasi di bidang Jabatan Fungsional Asisten Penyuluh Pajak yang dipublikasikan dalam bentuk buku/majalah ilmiah internasional",
            tkButir: "diterbitkan dan diakui oleh organisasi profesi dan Instansi Pembina",
            hasilKerja: "Jurnal/Buku/Naskah",
            jmlPoin: 6,
            levelReq: 7
        },
        {
            SubUnsurId: subB2.id,
            AktivitaId: aktG.id,
            namaButir: "Membuat karya tulis / karya ilmiah hasil penelitian / pengkajian /survei / evaluasi di bidang Jabatan Fungsional Asisten Penyuluh Pajak yang tidak dipublikasikan",
            tkButir: "dalam bentuk Buku",
            hasilKerja: "Buku",
            jmlPoin: 8,
            levelReq: 7
        },
        {
            SubUnsurId: subB2.id,
            AktivitaId: aktG.id,
            namaButir: "Membuat karya tulis / karya ilmiah hasil penelitian / pengkajian /survei / evaluasi di bidang Jabatan Fungsional Asisten Penyuluh Pajak yang tidak dipublikasikan",
            tkButir: "dalam bentuk Makalah",
            hasilKerja: "Makalah",
            jmlPoin: 4,
            levelReq: 7
        },
        {
            SubUnsurId: subB2.id,
            AktivitaId: aktG.id,
            namaButir: "Membuat karya tulis / karya ilmiah berupa tinjauan atau ulasan ilmiah hasil gagasan sendiri di bidang Jabatan Fungsional Asisten Penyuluh Pajak yang dipublikasikan:",
            tkButir: "dalam bentuk buku yang diterbitkan dan diedarkan secara nasional",
            hasilKerja: "Buku",
            jmlPoin: 8,
            levelReq: 7
        },
        {
            SubUnsurId: subB2.id,
            AktivitaId: aktG.id,
            namaButir: "Membuat karya tulis / karya ilmiah berupa tinjauan atau ulasan ilmiah hasil gagasan sendiri di bidang Jabatan Fungsional Asisten Penyuluh Pajak yang dipublikasikan:",
            tkButir: "dalam majalah ilmiah yang diakui oleh organisasi profesi dan Instansi Pembina",
            hasilKerja: "Naskah",
            jmlPoin: 4,
            levelReq: 7
        },
        {
            SubUnsurId: subB2.id,
            AktivitaId: aktG.id,
            namaButir: "Membuat karya tulis / karya ilmiah berupa tinjauan atau ulasan ilmiah hasil gagasan sendiri di bidang Jabatan Fungsional Asisten Penyuluh Pajak yang tidak dipublikasikan:",
            tkButir: "dalam bentuk Buku",
            hasilKerja: "Buku",
            jmlPoin: 7,
            levelReq: 7
        },
        {
            SubUnsurId: subB2.id,
            AktivitaId: aktG.id,
            namaButir: "Membuat karya tulis / karya ilmiah berupa tinjauan atau ulasan ilmiah hasil gagasan sendiri di bidang Jabatan Fungsional Asisten Penyuluh Pajak yang tidak dipublikasikan:",
            tkButir: "dalam bentuk Makalah",
            hasilKerja: "Makalah",
            jmlPoin: 3.5,
            levelReq: 7
        },
        {
            SubUnsurId: subB2.id,
            AktivitaId: aktG.id,
            namaButir: "Menyampaikan prasaran berupa tinjauan,gagasan dan atau ulasan ilmiah dalam pertemuan ilmiah",
            tkButir: "-",
            hasilKerja: "Naskah",
            jmlPoin: 2.5,
            levelReq: 7
        },
        {
            SubUnsurId: subB2.id,
            AktivitaId: aktG.id,
            namaButir: "Membuat artikel di bidang Jabatan Fungsional Asisten Penyuluh Pajak yang dipublikasikan.",
            tkButir: "-",
            hasilKerja: "Artikel",
            jmlPoin: 2,
            levelReq: 7
        },
        {
            SubUnsurId: subC2.id,
            AktivitaId: aktG.id,
            namaButir: "Menerjemahkan / menyadur buku atau karya ilmiah di bidang Jabatan Fungsional Asisten Penyuluh Pajak yang dipublikasikan :",
            tkButir: "dalam bentuk buku yang diterbitkan dan diedarkan secara nasional",
            hasilKerja: "Buku",
            jmlPoin: 7,
            levelReq: 7
        },
        {
            SubUnsurId: subC2.id,
            AktivitaId: aktG.id,
            namaButir: "Menerjemahkan / menyadur buku atau karya ilmiah di bidang Jabatan Fungsional Asisten Penyuluh Pajak yang dipublikasikan :",
            tkButir: "dalam majalah ilmiah yang diakui oleh organisasi profesi dan Instansi Pembina",
            hasilKerja: "Naskah",
            jmlPoin: 3.5,
            levelReq: 7
        },
        {
            SubUnsurId: subC2.id,
            AktivitaId: aktG.id,
            namaButir: "Menerjemahkan / menyadur buku atau karya ilmiah di bidang Jabatan Fungsional Asisten Penyuluh Pajak yangtidak dipublikasikan :",
            tkButir: "dalam bentuk Buku",
            hasilKerja: "Buku",
            jmlPoin: 3,
            levelReq: 7
        },
        {
            SubUnsurId: subC2.id,
            AktivitaId: aktG.id,
            namaButir: "Menerjemahkan / menyadur buku atau karya ilmiah di bidang Jabatan Fungsional Asisten Penyuluh Pajak yangtidak dipublikasikan :",
            tkButir: "dalam bentuk Makalah",
            hasilKerja: "Makalah",
            jmlPoin: 1.5,
            levelReq: 7
        },
        {
            SubUnsurId: subD2.id,
            AktivitaId: aktG.id,
            namaButir: "Membuat buku standar/pedoman/ petunjuk pelaksanaan/ petunjuk teknis di bidang Jabatan Fungsional Asisten Penyuluh Pajak",
            tkButir: "-",
            hasilKerja: "Buku",
            jmlPoin: 3,
            levelReq: 7
        },
        {
            SubUnsurId: subE2.id,
            AktivitaId: aktG.id,
            namaButir: "Pelatihan fungsional",
            tkButir: "-",
            hasilKerja: "Sertifikat/Laporan",
            jmlPoin: 0.5,
            levelReq: 7
        },
        {
            SubUnsurId: subE2.id,
            AktivitaId: aktG.id,
            namaButir: "Seminar/lokakarya/konferensi/simposium/studi banding-lapangan",
            tkButir: "-",
            hasilKerja: "Sertifikat/Laporan",
            jmlPoin: 3,
            levelReq: 7
        },
        {
            SubUnsurId: subE2.id,
            AktivitaId: aktG.id,
            namaButir: "Pelatihan teknis/magang di bidang tugas Jabatan Fungsional Asisten Penyuluh Pajak dan memperoleh Sertifikat",
            tkButir: "> 960 Jam",
            hasilKerja: "Sertifikat/Laporan",
            jmlPoin: 15,
            levelReq: 7
        },
        {
            SubUnsurId: subE2.id,
            AktivitaId: aktG.id,
            namaButir: "Pelatihan teknis/magang di bidang tugas Jabatan Fungsional Asisten Penyuluh Pajak dan memperoleh Sertifikat",
            tkButir: "641 - 960 Jam",
            hasilKerja: "Sertifikat/Laporan",
            jmlPoin: 9,
            levelReq: 7
        },
        {
            SubUnsurId: subE2.id,
            AktivitaId: aktG.id,
            namaButir: "Pelatihan teknis/magang di bidang tugas Jabatan Fungsional Asisten Penyuluh Pajak dan memperoleh Sertifikat",
            tkButir: "481 - 640 Jam",
            hasilKerja: "Sertifikat/Laporan",
            jmlPoin: 6,
            levelReq: 7
        },
        {
            SubUnsurId: subE2.id,
            AktivitaId: aktG.id,
            namaButir: "Pelatihan teknis/magang di bidang tugas Jabatan Fungsional Asisten Penyuluh Pajak dan memperoleh Sertifikat",
            tkButir: "161 - 480 jam",
            hasilKerja: "Sertifikat/Laporan",
            jmlPoin: 3,
            levelReq: 7
        },
        {
            SubUnsurId: subE2.id,
            AktivitaId: aktG.id,
            namaButir: "Pelatihan teknis/magang di bidang tugas Jabatan Fungsional Asisten Penyuluh Pajak dan memperoleh Sertifikat",
            tkButir: "81 - 160 jam",
            hasilKerja: "Sertifikat/Laporan",
            jmlPoin: 2,
            levelReq: 7
        },
        {
            SubUnsurId: subE2.id,
            AktivitaId: aktG.id,
            namaButir: "Pelatihan teknis/magang di bidang tugas Jabatan Fungsional Asisten Penyuluh Pajak dan memperoleh Sertifikat",
            tkButir: "31 - 80 jam",
            hasilKerja: "Sertifikat/Laporan",
            jmlPoin: 1,
            levelReq: 7
        },
        {
            SubUnsurId: subE2.id,
            AktivitaId: aktG.id,
            namaButir: "Pelatihan teknis/magang di bidang tugas Jabatan Fungsional Asisten Penyuluh Pajak dan memperoleh Sertifikat",
            tkButir: "< 30 jam",
            hasilKerja: "Sertifikat/Laporan",
            jmlPoin: 0.5,
            levelReq: 7
        },
        {
            SubUnsurId: subE2.id,
            AktivitaId: aktG.id,
            namaButir: "Pelatihan manajerial/sosial kultural di bidang tugas Jabatan Fungsional Asisten Penyuluh Pajak dan memperoleh Sertifikat",
            tkButir: "> 960 Jam",
            hasilKerja: "Sertifikat/Laporan",
            jmlPoin: 7.5,
            levelReq: 7
        },
        {
            SubUnsurId: subE2.id,
            AktivitaId: aktG.id,
            namaButir: "Pelatihan manajerial/sosial kultural di bidang tugas Jabatan Fungsional Asisten Penyuluh Pajak dan memperoleh Sertifikat",
            tkButir: "641 - 960 Jam",
            hasilKerja: "Sertifikat/Laporan",
            jmlPoin: 4.5,
            levelReq: 7
        },
        {
            SubUnsurId: subE2.id,
            AktivitaId: aktG.id,
            namaButir: "Pelatihan manajerial/sosial kultural di bidang tugas Jabatan Fungsional Asisten Penyuluh Pajak dan memperoleh Sertifikat",
            tkButir: "481 - 640 Jam",
            hasilKerja: "Sertifikat/Laporan",
            jmlPoin: 3,
            levelReq: 7
        },
        {
            SubUnsurId: subE2.id,
            AktivitaId: aktG.id,
            namaButir: "Pelatihan manajerial/sosial kultural di bidang tugas Jabatan Fungsional Asisten Penyuluh Pajak dan memperoleh Sertifikat",
            tkButir: "161 - 480 jam",
            hasilKerja: "Sertifikat/Laporan",
            jmlPoin: 1.5,
            levelReq: 7
        },
        {
            SubUnsurId: subE2.id,
            AktivitaId: aktG.id,
            namaButir: "Pelatihan manajerial/sosial kultural di bidang tugas Jabatan Fungsional Asisten Penyuluh Pajak dan memperoleh Sertifikat",
            tkButir: "81 - 160 jam",
            hasilKerja: "Sertifikat/Laporan",
            jmlPoin: 1,
            levelReq: 7
        },
        {
            SubUnsurId: subE2.id,
            AktivitaId: aktG.id,
            namaButir: "Pelatihan manajerial/sosial kultural di bidang tugas Jabatan Fungsional Asisten Penyuluh Pajak dan memperoleh Sertifikat",
            tkButir: "31 - 80 jam",
            hasilKerja: "Sertifikat/Laporan",
            jmlPoin: 0.5,
            levelReq: 7
        },
        {
            SubUnsurId: subE2.id,
            AktivitaId: aktG.id,
            namaButir: "Pelatihan manajerial/sosial kultural di bidang tugas Jabatan Fungsional Asisten Penyuluh Pajak dan memperoleh Sertifikat",
            tkButir: "< 30 jam",
            hasilKerja: "Sertifikat/Laporan",
            jmlPoin: 0.25,
            levelReq: 7
        },
        {
            SubUnsurId: subE2.id,
            AktivitaId: aktG.id,
            namaButir: "Maintain performance  (pemeliharaan kinerja dan target kinerja)",
            tkButir: "-",
            hasilKerja: "Sertifikat/Laporan",
            jmlPoin: 0.5,
            levelReq: 7
        },
        {
            SubUnsurId: subE2.id,
            AktivitaId: aktG.id,
            namaButir: "Kunjungan Kerja",
            tkButir: "-",
            hasilKerja: "Sertifikat/Laporan",
            jmlPoin: 0.3,
            levelReq: 7
        },
        {
            SubUnsurId: subF2.id,
            AktivitaId: aktG.id,
            namaButir: "Melaksanakan kegiatan lain yang mendukung pengembangan profesi yang ditetapkan oleh Instansi Pembina di bidang Jabatan Fungsional Asisten Penyuluh Pajak",
            tkButir: "-",
            hasilKerja: "Sertifikat/Laporan",
            jmlPoin: 0.5,
            levelReq: 7
        },
        {
            SubUnsurId: subA3.id,
            AktivitaId: aktG.id,
            namaButir: "Mengajar/ melatih / membimbing yang berkaitan dengan bidang Jabatan Fungsional Asisten Penyuluh Pajak",
            tkButir: "-",
            hasilKerja: "Sertifikat/Laporan",
            jmlPoin: 0.4,
            levelReq: 7
        },
        {
            SubUnsurId: subB3.id,
            AktivitaId: aktG.id,
            namaButir: "Menjadi anggota Tim Penilai/Tim Uji Kompetensi",
            tkButir: "-",
            hasilKerja: "Laporan",
            jmlPoin: 0.04,
            levelReq: 7
        },
        {
            SubUnsurId: subC3.id,
            AktivitaId: aktG.id,
            namaButir: "Memperoleh penghargaan / tanda jasa Satya Lancana Karya Satya :",
            tkButir: "30 (tiga puluh) tahun",
            hasilKerja: "Piagam",
            jmlPoin: 3,
            levelReq: 7
        },
        {
            SubUnsurId: subC3.id,
            AktivitaId: aktG.id,
            namaButir: "Memperoleh penghargaan / tanda jasa Satya Lancana Karya Satya :",
            tkButir: "20 (dua puluh) tahun",
            hasilKerja: "Piagam",
            jmlPoin: 2,
            levelReq: 7
        },
        {
            SubUnsurId: subC3.id,
            AktivitaId: aktG.id,
            namaButir: "Memperoleh penghargaan / tanda jasa Satya Lancana Karya Satya :",
            tkButir: "10 (sepuluh) tahun",
            hasilKerja: "Piagam",
            jmlPoin: 1,
            levelReq: 7
        },
        {
            SubUnsurId: subC3.id,
            AktivitaId: aktG.id,
            namaButir: "Penghargaan/tanda jasa atas prestasi kerja",
            tkButir: "Tingkat internasional",
            hasilKerja: "Sertifikat/Piagam",
            jmlPoin: "35% AK kenaikan pangkat",
            levelReq: 7
        },
        {
            SubUnsurId: subC3.id,
            AktivitaId: aktG.id,
            namaButir: "Penghargaan/tanda jasa atas prestasi kerja",
            tkButir: "Tingkat Nasional",
            hasilKerja: "Sertifikat/Piagam",
            jmlPoin: "25% AK kenaikan pangkat",
            levelReq: 7
        },
        {
            SubUnsurId: subC3.id,
            AktivitaId: aktG.id,
            namaButir: "Penghargaan/tanda jasa atas prestasi kerja",
            tkButir: "Tingkat Provinsi",
            hasilKerja: "Sertifikat/Piagam",
            jmlPoin: "15% AK kenaikan pangkat",
            levelReq: 7
        },
        {
            SubUnsurId: subD3.id,
            AktivitaId: aktG.id,
            namaButir: "Sarjana Muda/Diploma Tiga",
            tkButir: "-",
            hasilKerja: "Ijazah",
            jmlPoin: 4,
            levelReq: 7
        },
        {
            SubUnsurId: subD3.id,
            AktivitaId: aktG.id,
            namaButir: "Sarjana/ Diploma Empat",
            tkButir: "-",
            hasilKerja: "Ijazah",
            jmlPoin: 5,
            levelReq: 7
        },
        {
            SubUnsurId: subE3.id,
            AktivitaId: aktG.id,
            namaButir: "Melakukan kegiatan yang mendukung pelaksanaan tugas Jabatan Fungsional Asisten Penyuluh Pajak",
            tkButir: "-",
            hasilKerja: "Laporan",
            jmlPoin: 0.04,
            levelReq: 7
        }
    
    ]);

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('SubUnsur', null, {});
    await queryInterface.bulkDelete('Aktivitas', null, {});
    await queryInterface.bulkDelete('Butir', null, {});
  }
};
