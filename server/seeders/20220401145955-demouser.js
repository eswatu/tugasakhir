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
      level: "pelaksana",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "Pegawai 2",
      username: "pegawai2",
      passwordHash: await bcrypt.hash("pegawai2", 10) ,
      role: "User",
      level: "pelaksana",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "Pegawai 3",
      username: "pegawai3",
      passwordHash: await bcrypt.hash("pegawai3", 10) ,
      role: "User",
      level: "pelaksana",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
        
    //insert sub unsur
  await queryInterface.bulkInsert('SubUnsur', [{
      kodeSub:'A',
      namaSubUnsur: "A. Penyuluhan Langsung Secara Aktif"},{
      kodeSub:'B',
      namaSubUnsur: "B. Penyuluhan Langsung Secara Pasif"},{
      kodeSub:'C',
      namaSubUnsur: "C. Penyuluhan Tidak Langsung Satu Arah"},{
      kodeSub:'D',
      namaSubUnsur: "D. Penyuluhan Tidak Langsung Dua Arah"},{
      kodeSub:'E',
      namaSubUnsur: "E. Penyuluhan Tidak Langsung Melalui Contact Center dan Penyelesaian Administrasi Perpajakan"}, {
      kodeSub: 'F',
      namaSubUnsur: "F. Penyuluhan Melalui Pihak Ketiga"
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
          }
        ]);
    //insert Butir
    const subA = await db.SubUnsur.findOne({ where: { kodeSub: "A" } });
    const subB = await db.SubUnsur.findOne({ where: { kodeSub: "B" } });
    const subC = await db.SubUnsur.findOne({ where: { kodeSub: "C" } });
    const subD = await db.SubUnsur.findOne({ where: { kodeSub: "D" } });
    const subE = await db.SubUnsur.findOne({ where: { kodeSub: "E" } });
    const subF = await db.SubUnsur.findOne({ where: { kodeSub: "F" } });

    const aktA = await db.Aktivitas.findOne({ where: { kodeAkt: "A" } });
    const aktB = await db.Aktivitas.findOne({ where: { kodeAkt: "B" } });
    const aktC = await db.Aktivitas.findOne({ where: { kodeAkt: "C" } });
    const aktD = await db.Aktivitas.findOne({ where: { kodeAkt: "D" } });
    const aktE = await db.Aktivitas.findOne({ where: { kodeAkt: "E" } });
    const aktF = await db.Aktivitas.findOne({ where: { kodeAkt: "F" } });
    await queryInterface.bulkInsert('Butir',[
      {
        SubUnsurId: subA.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan pemberian informasi secara langsung kepada Bendaharawan",
        tkButir: "-",
        hasilKerja: "Laporan Pelaksanaan kegiatan",
        jmlPoin: 0.03,
        levelReq: 2
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktD.id,
        namaButir: "Menyusun materi Penyuluhan langsung secara aktif kepada Bendaharawan",
        tkButir: "-",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.18,
        levelReq: 6
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktC.id,
        namaButir: "Menyusun rencana kerja kegiatan Penyuluhan langsung secara aktif per kegiatan (session plan )",
        tkButir: "Tingkat II",
        hasilKerja: "Laporan Session Plan",
        jmlPoin: 0.12,
        levelReq: 4
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktC.id,
        namaButir: "Melaksanakan pemantauan persiapan kegiatan Penyuluhan langsung secara aktif",
        tkButir: "Tingkat II",
        hasilKerja: "Laporan Pemantauan Persiapan",
        jmlPoin: 0.04,
        levelReq: 4
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktC.id,
        namaButir: "Menyusun materi uji awal (pretest ) dan uji akhir (posttest ) kegiatan Penyuluhan langsung secara aktif",
        tkButir: "Tingkat II",
        hasilKerja: "Materi Soal",
        jmlPoin: 0.04,
        levelReq: 4
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktC.id,
        namaButir: "Menyusun instrumen survei kegiatan Penyuluhan langsung secara aktif",
        tkButir: "Tingkat II",
        hasilKerja: "Materi Survei",
        jmlPoin: 0.02,
        levelReq: 4
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktD.id,
        namaButir: "Menyusun materi Penyuluhan langsung secara aktif kepada calon Wajib Pajak Orang Pribadi",
        tkButir: "Tingkat II",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.36,
        levelReq: 4
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan pemberian informasi secara langsung kepada Wajib Pajak Badan terdaftar non Pengusaha Kena Pajak",
        tkButir: "Tingkat II",
        hasilKerja: "Laporan Pelaksanaan kegiatan",
        jmlPoin: 0.06,
        levelReq: 4
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan pemberian informasi secara langsung kepada Wajib Pajak Badan terdaftar Pengusaha Kena Pajak",
        tkButir: "Tingkat II",
        hasilKerja: "Laporan Pelaksanaan kegiatan",
        jmlPoin: 0.06,
        levelReq: 4
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktF.id,
        namaButir: "melaksanakan monitoring  pelaksanaan kegiatan Penyuluhan langsung secara aktif",
        tkButir: "Tingkat II",
        hasilKerja: "Laporan Monitoring",
        jmlPoin: 0.06,
        levelReq: 4
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktD.id,
        namaButir: "Menyusun materi Penyuluhan langsung secara aktif kepadaWajib Pajak Orang Pribadi Asing",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.15,
        levelReq: 2
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktD.id,
        namaButir: "Menyusun materi Penyuluhan langsung secara aktif kepadaWajib Pajak Orang Pribadi terdaftar Pengusaha Kena Pajak",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.15,
        levelReq: 2
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan pemberian informasi secara langsung kepada Wajib Pajak Orang Pribadi Asing tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Pelaksanaan kegiatan",
        jmlPoin: 0.03,
        levelReq: 2
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan pemberian informasi secara langsung kepada Wajib Pajak Orang Pribadi terdaftar Pengusaha Kena Pajak tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Pelaksanaan kegiatan",
        jmlPoin: 0.03,
        levelReq: 2
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan pemberian informasi secara langsung kepada Wajib Pajak Badan terdaftar Pengusaha Kena Pajak",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Pelaksanaan kegiatan",
        jmlPoin: 0.03,
        levelReq: 2
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktC.id,
        namaButir: "Menyusun rencana kerja kegiatan Penyuluhan langsung secara aktif per kegiatan (session plan )",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Session Plan",
        jmlPoin: 0.12,
        levelReq: 4
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktC.id,
        namaButir: "Melaksanakan pemantauan persiapan kegiatan Penyuluhan langsung secara aktif",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Pemantauan Persiapan",
        jmlPoin: 0.04,
        levelReq: 4
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktC.id,
        namaButir: "Menyusun materi uji awal (pretest ) dan uji akhir (posttest ) kegiatan Penyuluhan langsung secara aktif",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Soal",
        jmlPoin: 0.04,
        levelReq: 4
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktC.id,
        namaButir: "Menyusun instrumen survei kegiatan Penyuluhan langsung secara aktif",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Survei",
        jmlPoin: 0.02,
        levelReq: 4
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktD.id,
        namaButir: "menyusun materi Penyuluhan langsung secara aktif kepadaWajib Pajak Orang Pribadi penentu penerimaan/prominen \n(subjek penentu penerimaan/high influence subject )",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.1,
        levelReq: 4
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktD.id,
        namaButir: "menyusun materi Penyuluhan langsung secara aktif kepadaWajib Pajak Badan Khusus (Bentuk Usaha Tetap/Joint\nVenture/Joint Operation /dan sebagainya)",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.1,
        levelReq: 4
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktD.id,
        namaButir: "Melaksanakan review terhadap materi Penyuluhan\nlangsung secara aktif",
        tkButir: "Tingkat III",
        hasilKerja: "Lembar Persetujuan",
        jmlPoin: 0.12,
        levelReq: 4
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan pemberian informasi secara langsung kepada Wajib Pajak Orang Pribadi penentu penerimaan/prominen (subjek penentu penerimaan/high influence subject ) tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Pelaksanaan kegiatan",
        jmlPoin: 0.06,
        levelReq: 4
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktD.id,
        namaButir: "Menyusun materi Penyuluhan langsung secara aktif kepada calon Wajib Pajak Orang Pribadi",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.06,
        levelReq: 1
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktD.id,
        namaButir: "Menyusun materi Penyuluhan langsung secara aktif kepada Wajib Pajak Orang Pribadi Baru",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.06,
        levelReq: 1
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktD.id,
        namaButir: "Menyusun materi Penyuluhan langsung secara aktif kepadaWajib Pajak Orang Pribadi terdaftar non Pengusaha Kena Pajak",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.06,
        levelReq: 1
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktD.id,
        namaButir: "Menyusun materi Penyuluhan langsung secara aktif kepadacalon Wajib Pajak Badan",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.06,
        levelReq: 1
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktD.id,
        namaButir: "Menyusun materi Penyuluhan langsung secara aktif kepadaWajib Pajak Badan baru",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.06,
        levelReq: 1
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktD.id,
        namaButir: "Menyusun materi Penyuluhan langsung secara aktif kepada Wajib Pajak Badan terdaftar non Pengusaha Kena Pajak",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.06,
        levelReq: 1
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktD.id,
        namaButir: "Menyusun materi Penyuluhan langsung secara aktif kepadaWajib Pajak Badan terdaftar Pengusaha Kena Pajak",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.06,
        levelReq: 1
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan pemberian informasi secara langsung kepada Calon Wajib Pajak Orang Pribadi tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Pelaksanaan kegiatan",
        jmlPoin: 0.008,
        levelReq: 1
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan pemberian informasi secara langsung kepada Wajib Pajak Orang Pribadi baru tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Pelaksanaan kegiatan",
        jmlPoin: 0.008,
        levelReq: 1
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan pemberian informasi secara langsung kepada Wajib Pajak Orang Pribadi terdaftar non Pengusaha Kena Pajak tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Pelaksanaan kegiatan",
        jmlPoin: 0.008,
        levelReq: 1
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan pemberian informasi secara langsung kepada Calon Wajib Pajak Badan tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Pelaksanaan kegiatan",
        jmlPoin: 0.012,
        levelReq: 1
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan pemberian informasi secara langsung kepada Wajib Pajak Badan baru tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Pelaksanaan kegiatan",
        jmlPoin: 0.012,
        levelReq: 1
      },
      {
        SubUnsurId: subA.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan pemberian informasi secara langsung kepada Wajib Pajak Badan terdaftar non Pengusaha Kena Pajak",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Pelaksanaan kegiatan",
        jmlPoin: 0.012,
        levelReq: 1
      },
      {
        SubUnsurId: subB.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan piket kegiatan Penyuluhan langsung secara pasif",
        tkButir: "Tingkat II",
        hasilKerja: "Laporan Piket",
        jmlPoin: 0.06,
        levelReq: 4
      },
      {
        SubUnsurId: subB.id,
        AktivitaId: aktE.id,
        namaButir: "memberikan konsultasi/bimbingan teknis secara langsung",
        tkButir: "Tingkat II",
        hasilKerja: "Berita Acara Konsultasi",
        jmlPoin: 0.02,
        levelReq: 4
      },
      {
        SubUnsurId: subB.id,
        AktivitaId: aktF.id,
        namaButir: "melaksanakan monitoring  pelaksanaan kegiatan Penyuluhan langsung secara pasif",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Monitoring",
        jmlPoin: 0.06,
        levelReq: 4
      },
      {
        SubUnsurId: subB.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan piket kegiatan Penyuluhan langsung secara pasif",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Piket",
        jmlPoin: 0.016,
        levelReq: 7
      },
      {
        SubUnsurId: subB.id,
        AktivitaId: aktE.id,
        namaButir: "memberikan konsultasi/bimbingan teknis secara langsung",
        tkButir: "Tingkat III",
        hasilKerja: "Berita Acara Konsultasi",
        jmlPoin: 0.004,
        levelReq: 7
      },
      {
        SubUnsurId: subC.id,
        AktivitaId: aktC.id,
        namaButir: "Menyusun rencana kerja kegiatan Penyuluhan tidak langsung satu arah per kegiatan (session plan )",
        tkButir: "Tingkat II",
        hasilKerja: "Laporan Session Plan",
        jmlPoin: 0.04,
        levelReq: 4
      },
      {
        SubUnsurId: subD.id,
        AktivitaId: aktC.id,
        namaButir: "Melaksanakan pemantauan persiapan kegiatan Penyuluhan tidak langsung satu arah",
        tkButir: "Tingkat II",
        hasilKerja: "Laporan Pemantauan Persiapan",
        jmlPoin: 0.04,
        levelReq: 4
      },
      {
        SubUnsurId: subD.id,
        AktivitaId: aktD.id,
        namaButir: "menyusun materi Penyuluhan tidak langsung satu arah melalui audio tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.075,
        levelReq: 2
      },
      {
        SubUnsurId: subD.id,
        AktivitaId: aktD.id,
        namaButir: "menyusun materi Penyuluhan tidak langsung satu arah melalui audio dan/atau visual tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.12,
        levelReq: 2
      },
      {
        SubUnsurId: subD.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan kegiatan Penyuluhan tidak langsung satu arah dalam bentuk audio tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Berita Acara Penyuluhan",
        jmlPoin: 0.12,
        levelReq: 2
      },
      {
        SubUnsurId: subD.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan kegiatan Penyuluhan tidak langsung satu arah dalam bentuk audio dan/atau visual tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Berita Acara Penyuluhan",
        jmlPoin: 0.24,
        levelReq: 2
      },
      {
        SubUnsurId: subD.id,
        AktivitaId: aktC.id,
        namaButir: "Menyusun rencana kerja kegiatan Penyuluhan tidak langsung satu arah per kegiatan (session plan )",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Session Plan",
        jmlPoin: 0.04,
        levelReq: 4
      },
      {
        SubUnsurId: subD.id,
        AktivitaId: aktC.id,
        namaButir: "Melaksanakan pemantauan persiapan kegiatan Penyuluhan tidak langsung satu arah",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Pemantauan Persiapan",
        jmlPoin: 0.04,
        levelReq: 4
      },
      {
        SubUnsurId: subD.id,
        AktivitaId: aktD.id,
        namaButir: "melaksanakan review terhadap materi Penyuluhan tidak langsung tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Lembar Persetujuan",
        jmlPoin: 0.04,
        levelReq: 4
      },
      {
        SubUnsurId: subD.id,
        AktivitaId: aktC.id,
        namaButir: "menyusun rencana kerja kegiatan Penyuluhan tidak langsung dua arah per kegiatan (session plan )",
        tkButir: "Tingkat II",
        hasilKerja: "Laporan Session Plan",
        jmlPoin: 0.06,
        levelReq: 4
      },
      {
        SubUnsurId: subD.id,
        AktivitaId: aktC.id,
        namaButir: "melaksanakan pemantauan persiapan kegiatan Penyuluhan tidak langsung dua arah",
        tkButir: "Tingkat II",
        hasilKerja: "Laporan Pemantauan Persiapan",
        jmlPoin: 0.04,
        levelReq: 4
      },
      {
        SubUnsurId: subD.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan kegiatan Penyuluhan tidak langsung dua arah dalam bentuk audio tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Berita Acara Penyuluhan",
        jmlPoin: 0.06,
        levelReq: 2
      },
      {
        SubUnsurId: subD.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan kegiatan Penyuluhan tidak langsung dua arah dalam bentuk audio dan/atau visual tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Berita Acara Penyuluhan",
        jmlPoin: 0.12,
        levelReq: 2
      },
      {
        SubUnsurId: subD.id,
        AktivitaId: aktC.id,
        namaButir: "menyusun rencana kerja kegiatan Penyuluhan tidak langsung dua arah per kegiatan (session plan )",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Session Plan",
        jmlPoin: 0.06,
        levelReq: 4
      },
      {
        SubUnsurId: subD.id,
        AktivitaId: aktC.id,
        namaButir: "melaksanakan pemantauan persiapan kegiatan Penyuluhan tidak langsung dua arah",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Pemantauan Persiapan",
        jmlPoin: 0.04,
        levelReq: 4
      },
      {
        SubUnsurId: subD.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan review terhadap materi Penyuluhan tidak langsung dua arah tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Lembar Persetujuan",
        jmlPoin: 0.04,
        levelReq: 4
      },
      {
        SubUnsurId: subD.id,
        AktivitaId: aktD.id,
        namaButir: "menyusun materi Penyuluhan tidak langsung dua arah melalui audio tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.032,
        levelReq: 1
      },
      {
        SubUnsurId: subD.id,
        AktivitaId: aktD.id,
        namaButir: "menyusun materi Penyuluhan tidak langsung dua arah melalui audio dan/atau visual tingkat 3",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.048,
        levelReq: 1
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktA.id,
        namaButir: "menyusun rencana kerja kegiatan Penyuluhan periodik (outbound)",
        tkButir: "-",
        hasilKerja: "Laporan Rencana Kerja",
        jmlPoin: 0.025,
        levelReq: 2
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktA.id,
        namaButir: "menyusun materi survei melalui media",
        tkButir: "-",
        hasilKerja: "Materi Survei",
        jmlPoin: 0.0267,
        levelReq: 2
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktA.id,
        namaButir: "menyusun materi Penyuluhan perpajakan",
        tkButir: "-",
        hasilKerja: "Materi Penyuluhan",
        jmlPoin: 0.04,
        levelReq: 2
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktA.id,
        namaButir: "menyusun panduan komunikasi dan panduan kegiatan penjaminan kualitas layanan",
        tkButir: "-",
        hasilKerja: "Laporan Internalisasi bahan panduan",
        jmlPoin: 0.03,
        levelReq: 2
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktA.id,
        namaButir: "menganalisis dan menyusun konsep jawaban yang ditanyakan oleh Penyuluh Pajak atas pertanyaan Wajib Pajak dan/atau masyarakat terkait informasi umum perpajakan dan/atau petunjuk penggunaan aplikasi perpajakan",
        tkButir: "-",
        hasilKerja: "Daftar Konsep Jawabanm",
        jmlPoin: 0.0011,
        levelReq: 2
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktA.id,
        namaButir: "melaksanakan inventarisasi dan mendokumentasikan pertanyaan Penyuluh Pajak di aplikasi sistem informasi contact center",
        tkButir: "-",
        hasilKerja: "Laporan Internalisasi bahan panduan",
        jmlPoin: 0.0009,
        levelReq: 2
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "menelaah dan melaksanakan penyesuaian jadwal pemberian dan penyampaian layanan",
        tkButir: "-",
        hasilKerja: "Laporan Penyesuaian Jadwal",
        jmlPoin: 0.0117,
        levelReq: 2
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan pemberian dan/atau penyampaian informasi perpajakan, penerimaan pengaduan,  dan/ataupetunjuk penggunaan aplikasi perpajakan melalui media selain telepon",
        tkButir: "-",
        hasilKerja: "Laporan Pelaksanaan kegiatan",
        jmlPoin: 0.0023,
        levelReq: 2
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "menganalisis dan menindaklanjuti pengaduan Wajib Pajak dan/atau masyarakat yang disampaikan",
        tkButir: "-",
        hasilKerja: "Laporan Hasil Analisa Pengaduan",
        jmlPoin: 0.0004,
        levelReq: 2
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan konfirmasi awal atas pengaduan dan/atau eskalasi Wajib Pajak dan/atau masyarakat yang disampaikan",
        tkButir: "-",
        hasilKerja: "Rekaman Media",
        jmlPoin: 0.0078,
        levelReq: 2
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan analisis dan mendokumentasikan pengaduan Wajib Pajak dan/atau masyarakat ke dalam sistem informasi pengaduan",
        tkButir: "-",
        hasilKerja: "Dokumentasi Sistem Informasi Pengaduan",
        jmlPoin: 0.001,
        levelReq: 2
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan asistensi Penyuluh Pajak yang baru bergabung di contact center  (tandem)",
        tkButir: "-",
        hasilKerja: "Laporan Pelaksanaan Asistensi",
        jmlPoin: 0.01,
        levelReq: 2
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "melakukan pengolahan data panggilan keluar kepada Wajib Pajak dan/atau masyarakat (outbound )",
        tkButir: "-",
        hasilKerja: "Laporan Pengolahan data panggilan keluar",
        jmlPoin: 0.0125,
        levelReq: 2
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan penyampaian konfirmasi lanjutan  hasil tindak lanjut pengelolaan pengaduan di bidang perpajakan",
        tkButir: "-",
        hasilKerja: "Rekaman Media",
        jmlPoin: 0.0085,
        levelReq: 2
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "menindaklanjuti pertanyaan Wajib Pajak dan/atau masyarakat terkait informasi perpajakan dan/atau petunjuk penggunaan aplikasi perpajakan yang belum terjawab (eskalasi) ke direktorat terkait",
        tkButir: "-",
        hasilKerja: "surat",
        jmlPoin: 0.0725,
        levelReq: 2
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan penyampaian jawaban atas pertanyaan Wajib Pajak dan/atau masyarakat yang belum terjawab (eskalasi)",
        tkButir: "-",
        hasilKerja: "laporan",
        jmlPoin: 0.0054,
        levelReq: 2
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan pendampingan Penyuluh Pajak dalam rangka pemberian/penyampaian layanan",
        tkButir: "-",
        hasilKerja: "laporan pendampingan",
        jmlPoin: 0.01,
        levelReq: 2
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan proses pembahasan bersama (kalibrasi) di internal seksi",
        tkButir: "-",
        hasilKerja: "berita acara pembahasan",
        jmlPoin: 0.0147,
        levelReq: 2
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan penilaian kualitas layanan informasi dan pengaduan",
        tkButir: "-",
        hasilKerja: "laporan hasil penilaian",
        jmlPoin: 0.0157,
        levelReq: 2
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "menganalisis hasil penilaian kualitas pemberian/penyampaian layanan secara periodik",
        tkButir: "-",
        hasilKerja: "laporan hasil penilaian periodik",
        jmlPoin: 0.006,
        levelReq: 2
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan inventarisasi dan menganalisis hasil eskalasi secara periodik",
        tkButir: "-",
        hasilKerja: "laporan hasil eskalasi periodik",
        jmlPoin: 0.0725,
        levelReq: 2
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan inventarisasi dan menganalisis tindakan pengaduan yang telah diselesaikan secara periodik",
        tkButir: "-",
        hasilKerja: "laporan hasil analisis pengaduan periodik",
        jmlPoin: 0.0242,
        levelReq: 2
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktF.id,
        namaButir: "melaksanakan analisis dan memberikan persetujuan atau penolakan atas pengajuan keberatan hasil penilaian kualitas layanan",
        tkButir: "-",
        hasilKerja: "rekomendasi teknis",
        jmlPoin: 0.0128,
        levelReq: 2
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktF.id,
        namaButir: "melaksanakan evaluasi atas layanan panggilan masuk ataupanggilan keluar melalui media telepon dan nontelepon",
        tkButir: "-",
        hasilKerja: "laporan evaluasi kinerja tim operasional",
        jmlPoin: 0.0394,
        levelReq: 2
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktA.id,
        namaButir: "melakukan review materi Penyuluhan perpajakan",
        tkButir: "-",
        hasilKerja: "Laporan Review",
        jmlPoin: 0.02,
        levelReq: 4
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "menyusun konsep usulan  pengembangan aplikasi pusat interaksi (contact center ) dalam rangka menunjang kegiatan pelayanan dengan pihak internal dan/atau eksternal",
        tkButir: "-",
        hasilKerja: "surat usulan",
        jmlPoin: 0.044,
        levelReq: 4
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "menganalisis dan menyusun daftar pertanyaan ke unit kerja atas permasalahan pemberian layanan",
        tkButir: "-",
        hasilKerja: "surat/nota dinas penyampaian daftar pertanyaan",
        jmlPoin: 0.02,
        levelReq: 4
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktF.id,
        namaButir: "melaksanakan  evaluasi atas layanan bagian pengaduan/penjaminan kualitas",
        tkButir: "-",
        hasilKerja: "laporan evaluasi kinerja tim pengaduan/penjaminan kualitas",
        jmlPoin: 0.03,
        levelReq: 4
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktF.id,
        namaButir: "melaksanakan pemantauan langsung (live monitoring ) atas pemberian dan/atau penyampaian informasi perpajakan, penerimaan pengaduan, permintaan transaksi perpajakan,dan/atau petunjuk penggunaan aplikasi perpajakan yang disampaikan melalui media",
        tkButir: "-",
        hasilKerja: "laporan pemantauan langsung",
        jmlPoin: 0.0207,
        levelReq: 6
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan jadwal interaksi (online )",
        tkButir: "-",
        hasilKerja: "Laporan piket Interaksi",
        jmlPoin: 0.004,
        levelReq: 7
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan koordinasi dengan pihak internal dan eksternal dalam rangka pelaksanaan operasional pusat interaksi (contact center )",
        tkButir: "-",
        hasilKerja: "laporan koordinasi",
        jmlPoin: 0.0081,
        levelReq: 7
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktF.id,
        namaButir: "menyusun tanggapan teknis atas hasil penilaian kualitas layanan",
        tkButir: "-",
        hasilKerja: "tanggapan dalam aplikasi",
        jmlPoin: 0.0051,
        levelReq: 7
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan survei melalui media",
        tkButir: "-",
        hasilKerja: "Rekaman Media",
        jmlPoin: 0.0003,
        levelReq: 1
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "mendokumentasikan pemberian dan/atau penyampaian informasi perpajakan, penerimaan pengaduan, permintaan transaksi perpajakan dan/atau petunjuk penggunaan aplikasi perpajakan melalui media ke dalam aplikasi",
        tkButir: "-",
        hasilKerja: "Dokumentasi Aplikasi CRM",
        jmlPoin: 0.0002,
        levelReq: 3
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "melakukan sosialisasi ketentuan/aplikasi perpajakan",
        tkButir: "Narasumber",
        hasilKerja: "Jam Pelatihan",
        jmlPoin: 0.01,
        levelReq: 6
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "melakukan sosialisasi ketentuan/aplikasi perpajakan",
        tkButir: "Peserta",
        hasilKerja: "Jam Pelatihan",
        jmlPoin: 0.0047,
        levelReq: 7
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktB.id,
        namaButir: "melaksanakan penyelesaian administrasi perpajakan",
        tkButir: "Tingkat I",
        hasilKerja: "laporan penelitian permohonan perpajakan",
        jmlPoin: 0.04,
        levelReq: 2
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan pemberian informasi perpajakan perpajakan, penerimaan pengaduan dan/atau pemberian petunjuk penggunaan aplikasi perpajakan melalui media telepon berdasarkan permintaan masyarakat/Wajib Pajak (inbound)",
        tkButir: "Tingkat I",
        hasilKerja: "Laporan Rekaman Media",
        jmlPoin: 0.0042,
        levelReq: 4
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan penyampaian informasi perpajakan dan/atau petunjuk penggunaan aplikasi perpajakan melalui media telepon berdasarkan kebutuhan organisasi (outbound )",
        tkButir: "Tingkat I",
        hasilKerja: "Laporan Rekaman Media",
        jmlPoin: 0.0017,
        levelReq: 4
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan penyampaian pengetahuan (transfer of knowledge ) kepada fungsional lain",
        tkButir: "Tingkat I",
        hasilKerja: "Laporan Hasil Pelaksanaan Penyampaian Pengetahuan",
        jmlPoin: 0.0106,
        levelReq: 6
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan pemberian informasi perpajakan perpajakan, penerimaan pengaduan dan/atau pemberian petunjuk penggunaan aplikasi perpajakan melalui media telepon berdasarkan permintaan masyarakat/Wajib Pajak (inbound)",
        tkButir: "Tingkat II",
        hasilKerja: "Laporan Rekaman Media",
        jmlPoin: 0.0021,
        levelReq: 2
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan penyampaian informasi perpajakan dan/atau petunjuk penggunaan aplikasi perpajakan melalui media telepon berdasarkan kebutuhan organisasi (outbound )",
        tkButir: "Tingkat II",
        hasilKerja: "Laporan Rekaman Media",
        jmlPoin: 0.0008,
        levelReq: 2
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktB.id,
        namaButir: "melaksanakan penyelesaian administrasi perpajakan",
        tkButir: "Tingkat II",
        hasilKerja: "laporan penelitian permohonan perpajakan",
        jmlPoin: 0.015,
        levelReq: 2
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan penyampaian pengetahuan (transfer of knowledge ) kepada fungsional lain",
        tkButir: "Tingkat II",
        hasilKerja: "Laporan Hasil Pelaksanaan Penyampaian Pengetahuan",
        jmlPoin: 0.0041,
        levelReq: 7
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan pemberian informasi perpajakan perpajakan, penerimaan pengaduan dan/atau pemberian petunjuk penggunaan aplikasi perpajakan melalui media telepon berdasarkan permintaan masyarakat/Wajib Pajak (inbound)",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Rekaman Media",
        jmlPoin: 0.0007,
        levelReq: 1
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktE.id,
        namaButir: "melaksanakan penyampaian informasi perpajakan dan/atau petunjuk penggunaan aplikasi perpajakan melalui media telepon berdasarkan kebutuhan organisasi (outbound )",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Rekaman Media",
        jmlPoin: 0.0003,
        levelReq: 1
      },
      {
        SubUnsurId: subE.id,
        AktivitaId: aktB.id,
        namaButir: "melaksanakan penyelesaian administrasi perpajakan",
        tkButir: "Tingkat III",
        hasilKerja: "laporan penelitian permohonan perpajakan",
        jmlPoin: 0.0007,
        levelReq: 1
      },
      {
        SubUnsurId: subF.id,
        AktivitaId: aktC.id,
        namaButir: "melakukan pemantauan persiapan kegiatan dalam rangka pelatihan pihak ketiga",
        tkButir: "Tingkat II",
        hasilKerja: "Laporan Pemantauan Persiapan",
        jmlPoin: 0.06,
        levelReq: 4
      },
      {
        SubUnsurId: subF.id,
        AktivitaId: aktD.id,
        namaButir: "menyusun materi uji awal (pre test ) dan uji akhir (post test ) dalam rangka pelatihan pihak ketiga",
        tkButir: "Tingkat II",
        hasilKerja: "Materi Soal",
        jmlPoin: 0.13,
        levelReq: 4
      },
      {
        SubUnsurId: subF.id,
        AktivitaId: aktC.id,
        namaButir: "melakukan pemantauan persiapan kegiatan dalam rangka pelatihan pihak ketiga",
        tkButir: "Tingkat III",
        hasilKerja: "Laporan Pemantauan Persiapan",
        jmlPoin: 0.06,
        levelReq: 4
      },
      {
        SubUnsurId: subF.id,
        AktivitaId: aktD.id,
        namaButir: "menyusun materi uji awal (pre test ) dan uji akhir (post test ) dalam rangka pelatihan pihak ketiga",
        tkButir: "Tingkat III",
        hasilKerja: "Materi Soal",
        jmlPoin: 0.13,
        levelReq: 4
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
