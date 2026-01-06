/**
 * 基金信息数据库
 */

const FUND_THEMES = {
  // 行业主题
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

  // 风格主题
  "红利": { category: "风格主题", color: "#E74C3C" },
  "价值": { category: "风格主题", color: "#27AE60" },
  "成长": { category: "风格主题", color: "#3498DB" },
  "小盘": { category: "风格主题", color: "#9B59B6" },
  "大盘": { category: "风格主题", color: "#2980B9" },
  "中盘": { category: "风格主题", color: "#1ABC9C" },
  "高分红": { category: "风格主题", color: "#E74C3C" },
  "低波": { category: "风格主题", color: "#95A5A6" },
  "高收益": { category: "风格主题", color: "#F39C12" },

  // 地域主题
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

const FUND_DATABASE = {};

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

module.exports = {
  FUND_THEMES,
  FUND_DATABASE,
  getAllFundThemes
};
