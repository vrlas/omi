/** 主要用于处理表格等工具函数 */
// import * as XLSX from 'xlsx'
// import XLSXD from 'xlsx-style-vite'
// import FileSaver from 'file-saver'

/**
 * @param data 表格数据
 * @param title 表格名
 * @param { enable: 是否启用表格样式 }
 */
const exportTable = async (data, title = '表格.xlsx', config = { enable: false }) => {
  const [XLSX, XLSXD, FileSaver] = await Promise.all([import('xlsx'), import('xlsx-style-vite'), import('file-saver')])
  const keys = Object.keys(data[0])
  data = data.map(item => {
    const ob = {}
    keys.forEach(k => ob[k] = item[k] || '')
    return ob
  })
  const sheet = XLSX.utils.json_to_sheet(data, { skipHeader: true })
  let blob
  if (config.enable) {
    const s2ab =  s => {
      const buf = new ArrayBuffer(s.length)
      const view = new Uint8Array(buf)
      for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
      return buf
    }
    // eslint-disable-next-line no-unused-vars
    let [_, s, m, e, n] = sheet['!ref'].match(/^([a-z]+)([0-9]+):([a-z]+)([0-9]+)$/i)
    const [sCode, eCode] = [s.charCodeAt(), e.charCodeAt()]
    const style = {
      font: {
        name: '宋体',
        bold: true,
        color: { rgb: 'f8fafc' }
      },
      alignment: {
        horizontal: 'center',
        vertical: 'center'
      },
      fill: {
        fgColor: { rgb: '10b981' }
      }
    }
    const setCenter = () => {
      for (let i = sCode; i <= eCode; i++) {
        for (let j = m; j <= n; j++) {
          const cell = sheet[`${String.fromCharCode(i)}${j}`]
          cell.s = { ...cell.s, alignment: style.alignment }
        }
      }
    }
    const setWidth = () => {
      const size = Object.keys(data[0]).length
      sheet['!cols'] = Array(size).fill({ wch: 20 }) // 列宽
    }
    const setHeaderBackground = () => {
      for (let i = sCode; i <= eCode; i++) {
        const cell = sheet[`${String.fromCharCode(i)}1`]
        cell.s = { ...cell.s, fill: style.fill, font: style.font }
      }
    }
    config.enableCenter && setCenter() // 设置居中
    config.enableWidth && setWidth()  // 设置宽度(行高没找到方案,!rows写法无效)
    config.enableHeaderBackground && setHeaderBackground() // 设置标题行背景
    const wbout = XLSXD.write({
      Sheets: { sheet1: sheet },
      SheetNames: ['sheet1']
    }, { bookType: 'xlsx', bookSST: false, type: 'binary' })
    blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' })
  } else {
    const wbout = XLSX.write({
      Sheets: { sheet1: sheet },
      SheetNames: ['sheet1']
    }, { bookType: 'xlsx', bookSST: false, type: 'array' })
    blob = new Blob([wbout], { type: 'application/octet-stream' })
  }
  FileSaver.saveAs(blob, title)
}

const readExcel = async (file, cb) => {
  const XLSX = await import('xlsx')
  const reader = new FileReader()
	reader.readAsBinaryString(file)
	reader.onload = function(e) {
		const sheet = XLSX.read(e.target.result, {type: 'binary'}).Sheets.sheet1
    const k = sheet['!ref'].match(/^([a-z]+)([0-9]+):([a-z]+)([0-9]+)$/i)
    delete sheet['!ref']
    const v = Object.values(sheet)
    const n = v.length / +k[k.length - 1]
    let count = 0, arr = [], temp = []
    for (let i = 0; i < v.length; i++) {
      count++
      temp.push(v[i]?.v)
      if (count % n === 0) {
        arr.push(temp)
        temp = []
      }
    }
    cb(arr)
	}
}

export {
  exportTable,
  readExcel
}