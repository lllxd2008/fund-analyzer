let currentAnalysis = null;
let currentFileName = '';
let currentChartType = { type: 'pie', tab: 'type' };
let chartInstances = {};

const FUND_CATEGORIES = [
  { name: "债券", keywords: ["债券", "纯债", "固收", "国开", "中债", "短债"], color: "#10B981" },
  { name: "黄金", keywords: ["黄金", "贵金属", "商品"], color: "#F97316" },
  { name: "海外", keywords: ["qdii", "港股", "海外", "美元", "标普", "恒生", "央企"], color: "#8B5CF6" },
  { name: "货币", keywords: ["货币", "现金", "宝", "理财"], color: "#F59E0B" },
  { name: "股票", keywords: ["股票", "指数", "沪深", "创业板", "消费", "医疗", "科技", "制造", "装备", "产业", "红利", "选股", "先锋"], color: "#3B82F6" },
  { name: "混合", keywords: ["混合", "配置", "平衡", "稳健", "增强"], color: "#EC4899" }
];

const FUND_THEMES = {
  "有色": { category: "行业主题", color: "#FF6B6B" },
  "黄金": { category: "行业主题", color: "#FFD93D" },
  "煤炭": { category: "行业主题", color: "#4A4A4A" },
  "石油": { category: "行业主题", color: "#2C3E50" },
  "电力": { category: "行业主题", color: "#F39C12" },
  "房地产": { category: "行业主题", color: "#E74C3C" },
  "医药": { category: "行业主题", color: "#3498DB" },
  "消费": { category: "行业主题", color: "#9B59B6" },
  "科技": { category: "行业主题", color: "#1ABC9C" },
  "制造": { category: "行业主题", color: "#34495E" },
  "金融": { category: "行业主题", color: "#27AE60" },
  "银行": { category: "行业主题", color: "#2980B9" },
  "保险": { category: "行业主题", color: "#C0392B" },
  "电子": { category: "行业主题", color: "#16A085" },
  "计算机": { category: "行业主题", color: "#8E44AD" },
  "通信": { category: "行业主题", color: "#2980B9" },
  "传媒": { category: "行业主题", color: "#D35400" },
  "农业": { category: "行业主题", color: "#27AE60" },
  "食品": { category: "行业主题", color: "#E67E22" },
  "纺织": { category: "行业主题", color: "#95A5A6" },
  "化工": { category: "行业主题", color: "#34495E" },
  "机械": { category: "行业主题", color: "#7F8C8D" },
  "汽车": { category: "行业主题", color: "#C0392B" },
  "军工": { category: "行业主题", color: "#2C3E50" },
  "环保": { category: "行业主题", color: "#16A085" },
  "新能源": { category: "行业主题", color: "#27AE60" },
  "光伏": { category: "行业主题", color: "#F39C12" },
  "风电": { category: "行业主题", color: "#3498DB" },
  "芯片": { category: "行业主题", color: "#8E44AD" },
  "半导体": { category: "行业主题", color: "#9B59B6" },
  "5G": { category: "行业主题", color: "#1ABC9C" },
  "人工智能": { category: "行业主题", color: "#2980B9" },
  "云计算": { category: "行业主题", color: "#3498DB" },
  "大数据": { category: "行业主题", color: "#8E44AD" },
  "互联网": { category: "行业主题", color: "#1ABC9C" },
  "电商": { category: "行业主题", color: "#E74C3C" },
  "游戏": { category: "行业主题", color: "#9B59B6" },
  "教育": { category: "行业主题", color: "#3498DB" },
  "旅游": { category: "行业主题", color: "#F39C12" },
  "酒店": { category: "行业主题", color: "#E67E22" },
  "物流": { category: "行业主题", color: "#34495E" },
  "运输": { category: "行业主题", color: "#7F8C8D" },
  "红利": { category: "风格主题", color: "#E74C3C" },
  "价值": { category: "风格主题", color: "#27AE60" },
  "成长": { category: "风格主题", color: "#3498DB" },
  "小盘": { category: "风格主题", color: "#9B59B6" },
  "大盘": { category: "风格主题", color: "#2980B9" },
  "中盘": { category: "风格主题", color: "#1ABC9C" },
  "高分红": { category: "风格主题", color: "#E74C3C" },
  "低波": { category: "风格主题", color: "#95A5A6" },
  "高收益": { category: "风格主题", color: "#F39C12" },
  "港股": { category: "地域主题", color: "#C0392B" },
  "美股": { category: "地域主题", color: "#2980B9" },
  "欧洲": { category: "地域主题", color: "#27AE60" },
  "日本": { category: "地域主题", color: "#E74C3C" },
  "新兴": { category: "地域主题", color: "#F39C12" },
  "东南亚": { category: "地域主题", color: "#9B59B6" },
  "中国": { category: "地域主题", color: "#E74C3C" },
  "沪深": { category: "地域主题", color: "#3498DB" },
  "创业板": { category: "地域主题", color: "#1ABC9C" },
  "科创板": { category: "地域主题", color: "#8E44AD" }
};

function categorizeFund(fundName) {
  const lowerName = fundName.toLowerCase();
  for (const category of FUND_CATEGORIES) {
    for (const keyword of category.keywords) {
      if (lowerName.includes(keyword.toLowerCase())) {
        return category.name;
      }
    }
  }
  return "其他";
}

function getCategoryColor(category) {
  const found = FUND_CATEGORIES.find(c => c.name === category);
  return found ? found.color : "#6B7280";
}

function getThemeColor(theme) {
  const themeInfo = FUND_THEMES[theme];
  return themeInfo ? themeInfo.color : "#999999";
}

function getAllFundThemes(fundCode, fundName) {
  const themes = [];
  const lowerName = fundName.toLowerCase();

  for (const theme in FUND_THEMES) {
    if (lowerName.includes(theme.toLowerCase())) {
      themes.push(theme);
    }
  }

  return themes;
}

function analyzeFunds(funds) {
  const fundsWithCategory = funds.map(fund => ({
    ...fund,
    category: categorizeFund(fund.基金名称),
    themes: getAllFundThemes(fund.基金代码, fund.基金名称)
  }));

  const totalAssets = funds.reduce((sum, fund) => sum + fund.资产情况, 0);

  // 按类型统计
  const typeMap = new Map();
  fundsWithCategory.forEach(fund => {
    const existing = typeMap.get(fund.category) || { totalAssets: 0, count: 0 };
    typeMap.set(fund.category, {
      totalAssets: existing.totalAssets + fund.资产情况,
      count: existing.count + 1
    });
  });

  const categories = Array.from(typeMap.entries())
    .map(([category, stats]) => ({
      category,
      totalAssets: stats.totalAssets,
      count: stats.count,
      percentage: (stats.totalAssets / totalAssets) * 100,
      color: getCategoryColor(category)
    }))
    .sort((a, b) => b.totalAssets - a.totalAssets);

  // 按主题统计
  const themeMap = new Map();
  fundsWithCategory.forEach(fund => {
    fund.themes.forEach(theme => {
      const existing = themeMap.get(theme) || { totalAssets: 0, count: 0 };
      themeMap.set(theme, {
        totalAssets: existing.totalAssets + fund.资产情况,
        count: existing.count + 1
      });
    });
  });

  const themes = Array.from(themeMap.entries())
    .map(([theme, stats]) => ({
      theme,
      totalAssets: stats.totalAssets,
      count: stats.count,
      percentage: (stats.totalAssets / totalAssets) * 100,
      color: getThemeColor(theme),
      themeInfo: FUND_THEMES[theme]
    }))
    .sort((a, b) => b.totalAssets - a.totalAssets);

  return { totalAssets, totalFunds: funds.length, categories, themes, funds: fundsWithCategory };
}

function formatCurrency(value) {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

function formatPercentage(value) {
  return `${value.toFixed(2)}%`;
}

function showMessage(text, type) {
  const messageEl = document.getElementById('message');
  messageEl.textContent = text;
  messageEl.className = `message ${type}`;
  messageEl.classList.remove('hidden');
  setTimeout(() => messageEl.classList.add('hidden'), 5000);
}

async function openFile() {
  try {
    const filePath = await window.electronAPI.openFile();
    if (filePath) {
      const fileContent = await fetch(`file://${filePath}`).then(r => r.arrayBuffer());
      processFile(fileContent, filePath);
    }
  } catch (error) {
    showMessage(`❌ 打开文件失败: ${error.message}`, 'error');
  }
}

function processFile(fileContent, filePath) {
  try {
    const workbook = XLSX.read(fileContent, { type: 'array' });
    
    let worksheet = null;
    if (workbook.SheetNames.includes("持有信息")) {
      worksheet = workbook.Sheets["持有信息"];
    } else {
      worksheet = workbook.Sheets[workbook.SheetNames[0]];
    }

    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    const funds = jsonData
      .map((row, index) => {
        let assetValue = 0;
        const possibleColumns = [
          "资产情况\r\n（结算币种）",
          "资产情况\n（结算币种）",
          "资产情况（结算币种）",
          "资产情况",
          "持有金额",
          "金额"
        ];

        for (const col of possibleColumns) {
          if (row[col] !== undefined && row[col] !== null) {
            const val = parseFloat(row[col]);
            if (!isNaN(val) && val > 0) {
              assetValue = val;
              break;
            }
          }
        }

        return {
          序号: row["序号"] || index + 1,
          基金代码: String(row["基金代码"] || ""),
          基金名称: String(row["基金名称"] || ""),
          资产情况: assetValue
        };
      })
      .filter(fund => fund.基金名称 && fund.基金名称.trim() && fund.资产情况 > 0);

    if (funds.length === 0) {
      showMessage("❌ Excel 文件中未找到有效的基金数据", "error");
      return;
    }

    currentFileName = filePath.split('\\').pop();
    currentAnalysis = analyzeFunds(funds);
    displayAnalysis();
    showMessage(`✅ 成功分析 ${funds.length} 只基金`, "success");
  } catch (error) {
    console.error(error);
    showMessage(`❌ 解析失败: ${error.message}`, "error");
  }
}

function displayAnalysis() {
  document.getElementById('emptyState').classList.add('hidden');
  document.getElementById('analysisResult').classList.remove('hidden');

  document.getElementById('totalAssets').textContent = formatCurrency(currentAnalysis.totalAssets);
  document.getElementById('totalFunds').textContent = currentAnalysis.totalFunds;
  document.getElementById('categoryCount').textContent = currentAnalysis.categories.length;
  document.getElementById('themeCount').textContent = currentAnalysis.themes.length;

  // 基金类型统计表
  const typeTable = document.getElementById('typeTable');
  typeTable.innerHTML = currentAnalysis.categories.map(cat => `
    <tr>
      <td><span class="category-badge" style="background-color: ${cat.color}">${cat.category}</span></td>
      <td>${cat.count}</td>
      <td>${formatCurrency(cat.totalAssets)}</td>
      <td>${formatPercentage(cat.percentage)}</td>
    </tr>
  `).join('');

  // 投资主题统计表
  const themeTable = document.getElementById('themeTable');
  themeTable.innerHTML = currentAnalysis.themes.map(theme => `
    <tr>
      <td><span class="theme-badge" style="background-color: ${theme.color}">${theme.theme}</span></td>
      <td>${theme.themeInfo ? theme.themeInfo.category : '其他'}</td>
      <td>${theme.count}</td>
      <td>${formatCurrency(theme.totalAssets)}</td>
      <td>${formatPercentage(theme.percentage)}</td>
    </tr>
  `).join('');

  // 基金详情表
  const fundTable = document.getElementById('fundTable');
  fundTable.innerHTML = currentAnalysis.funds.map(fund => `
    <tr>
      <td>${fund.序号}</td>
      <td>${fund.基金代码}</td>
      <td>${fund.基金名称}</td>
      <td>${fund.category}</td>
      <td>${fund.themes.length > 0 ? fund.themes.map(t => `<span class="theme-badge" style="background-color: ${getThemeColor(t)}">${t}</span>`).join('') : '-'}</td>
      <td>${formatCurrency(fund.资产情况)}</td>
      <td>${formatPercentage((fund.资产情况 / currentAnalysis.totalAssets) * 100)}</td>
    </tr>
  `).join('');

  // 绘制图表
  drawChart('type');
  drawChart('theme');
}

function drawChart(tab) {
  const data = tab === 'type' ? currentAnalysis.categories : currentAnalysis.themes;
  const canvasId = tab === 'type' ? 'typeChart' : 'themeChart';
  const labelKey = tab === 'type' ? 'category' : 'theme';

  const ctx = document.getElementById(canvasId).getContext('2d');
  const labels = data.map(d => d[labelKey]);
  const values = data.map(d => d.totalAssets);
  const colors = data.map(d => d.color);

  if (chartInstances[canvasId]) chartInstances[canvasId].destroy();

  const config = {
    type: currentChartType.tab === tab ? currentChartType.type : 'pie',
    data: {
      labels,
      datasets: [{
        label: '资产金额',
        data: values,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: (currentChartType.tab === tab && currentChartType.type === 'pie') ? 'right' : 'top',
          labels: { font: { size: 12 }, padding: 15 }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return formatCurrency(context.parsed.y || context.parsed);
            }
          }
        }
      },
      scales: (currentChartType.tab === tab && currentChartType.type === 'pie') ? {} : {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return formatCurrency(value);
            }
          }
        }
      }
    }
  };

  chartInstances[canvasId] = new Chart(ctx, config);
}

function switchTab(tab) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById(tab + 'Tab').classList.add('active');
  event.target.classList.add('active');
}

function switchChart(tab, type) {
  currentChartType = { type, tab };
  const canvasId = tab === 'type' ? 'typeChart' : 'themeChart';
  document.querySelectorAll(`#${canvasId}`).parentElement?.querySelectorAll('.chart-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  drawChart(tab);
}

function exportToExcel() {
  const wb = XLSX.utils.book_new();

  const summaryData = [
    ['基金分析报告'],
    ['文件名', currentFileName],
    ['生成时间', new Date().toLocaleString('zh-CN')],
    ['总资产', formatCurrency(currentAnalysis.totalAssets)],
    ['基金总数', currentAnalysis.totalFunds],
    [],
    ['基金类型分布'],
    ['类型', '基金数', '总资产', '占比']
  ];

  currentAnalysis.categories.forEach(cat => {
    summaryData.push([cat.category, cat.count, formatCurrency(cat.totalAssets), formatPercentage(cat.percentage)]);
  });

  summaryData.push([], ['投资主题分布'], ['主题', '主题类型', '基金数', '总资产', '占比']);
  currentAnalysis.themes.forEach(theme => {
    summaryData.push([theme.theme, theme.themeInfo?.category || '其他', theme.count, formatCurrency(theme.totalAssets), formatPercentage(theme.percentage)]);
  });

  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, summarySheet, '汇总');

  const detailData = [['序号', '基金代码', '基金名称', '基金类型', '投资主题', '持有金额', '占比']];
  currentAnalysis.funds.forEach(fund => {
    detailData.push([
      fund.序号,
      fund.基金代码,
      fund.基金名称,
      fund.category,
      fund.themes.join('; '),
      formatCurrency(fund.资产情况),
      formatPercentage((fund.资产情况 / currentAnalysis.totalAssets) * 100)
    ]);
  });

  const detailSheet = XLSX.utils.aoa_to_sheet(detailData);
  XLSX.utils.book_append_sheet(wb, detailSheet, '基金详情');

  const timestamp = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(wb, `基金分析报告_${timestamp}.xlsx`);
  showMessage('✅ Excel 文件已导出', 'success');
}

function exportToPDF() {
  const timestamp = new Date().toLocaleString('zh-CN');
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>基金分析报告</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #0a7ea4; }
        h2 { color: #333; margin-top: 20px; border-bottom: 2px solid #0a7ea4; padding-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #0a7ea4; color: white; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        .summary { background-color: #f0f9ff; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <h1>基金持有分析报告</h1>
      <div class="summary">
        <p><strong>文件名:</strong> ${currentFileName}</p>
        <p><strong>生成时间:</strong> ${timestamp}</p>
        <p><strong>总资产:</strong> ${formatCurrency(currentAnalysis.totalAssets)}</p>
        <p><strong>基金总数:</strong> ${currentAnalysis.totalFunds}</p>
      </div>

      <h2>基金类型分布</h2>
      <table>
        <tr><th>类型</th><th>基金数</th><th>总资产</th><th>占比</th></tr>
  `;

  currentAnalysis.categories.forEach(cat => {
    html += `<tr><td>${cat.category}</td><td>${cat.count}</td><td>${formatCurrency(cat.totalAssets)}</td><td>${formatPercentage(cat.percentage)}</td></tr>`;
  });

  html += `</table><h2>投资主题分布</h2><table><tr><th>主题</th><th>主题类型</th><th>基金数</th><th>总资产</th><th>占比</th></tr>`;

  currentAnalysis.themes.forEach(theme => {
    html += `<tr><td>${theme.theme}</td><td>${theme.themeInfo?.category || '其他'}</td><td>${theme.count}</td><td>${formatCurrency(theme.totalAssets)}</td><td>${formatPercentage(theme.percentage)}</td></tr>`;
  });

  html += `</table><h2>基金详情</h2><table><tr><th>序号</th><th>基金代码</th><th>基金名称</th><th>基金类型</th><th>投资主题</th><th>持有金额</th><th>占比</th></tr>`;

  currentAnalysis.funds.forEach(fund => {
    html += `<tr><td>${fund.序号}</td><td>${fund.基金代码}</td><td>${fund.基金名称}</td><td>${fund.category}</td><td>${fund.themes.join('; ')}</td><td>${formatCurrency(fund.资产情况)}</td><td>${formatPercentage((fund.资产情况 / currentAnalysis.totalAssets) * 100)}</td></tr>`;
  });

  html += `</table></body></html>`;

  const printWindow = window.open('', '', 'width=800,height=600');
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.print();
  showMessage('✅ PDF 已打开，请在打印对话框中保存为 PDF', 'success');
}

function resetAnalysis() {
  currentAnalysis = null;
  currentFileName = '';
  document.getElementById('analysisResult').classList.add('hidden');
  document.getElementById('emptyState').classList.remove('hidden');
}

// 拖放上传
const uploadArea = document.querySelector('.upload-area');
uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.style.borderColor = '#086a8f';
  uploadArea.style.background = '#e6f7ff';
});

uploadArea.addEventListener('dragleave', () => {
  uploadArea.style.borderColor = '#0a7ea4';
  uploadArea.style.background = '#f0f9ff';
});

uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.style.borderColor = '#0a7ea4';
  uploadArea.style.background = '#f0f9ff';
  
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    const file = files[0];
    if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        processFile(event.target.result, file.name);
      };
      reader.readAsArrayBuffer(file);
    }
  }
});
