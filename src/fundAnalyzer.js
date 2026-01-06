const fundDatabase = require('./fundDatabase');

const FUND_CATEGORIES = [
  { name: "债券", keywords: ["债券", "纯债", "固收", "国开", "中债", "短债"], color: "#10B981" },
  { name: "黄金", keywords: ["黄金", "贵金属", "商品"], color: "#F97316" },
  { name: "海外", keywords: ["qdii", "港股", "海外", "美元", "标普", "恒生", "央企"], color: "#8B5CF6" },
  { name: "货币", keywords: ["货币", "现金", "宝", "理财"], color: "#F59E0B" },
  { name: "股票", keywords: ["股票", "指数", "沪深", "创业板", "消费", "医疗", "科技", "制造", "装备", "产业", "红利", "选股", "先锋"], color: "#3B82F6" },
  { name: "混合", keywords: ["混合", "配置", "平衡", "稳健", "增强"], color: "#EC4899" }
];

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
  const themeInfo = fundDatabase.FUND_THEMES[theme];
  return themeInfo ? themeInfo.color : "#999999";
}

function analyzeFunds(funds) {
  const fundsWithCategory = funds.map(fund => ({
    ...fund,
    category: categorizeFund(fund.基金名称),
    themes: fundDatabase.getAllFundThemes(fund.基金代码, fund.基金名称)
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
      themeInfo: fundDatabase.FUND_THEMES[theme]
    }))
    .sort((a, b) => b.totalAssets - a.totalAssets);

  return { totalAssets, totalFunds: funds.length, categories, themes, funds: fundsWithCategory };
}

module.exports = {
  analyzeFunds,
  FUND_CATEGORIES
};
