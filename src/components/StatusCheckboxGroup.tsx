import React, { useState, useCallback, useMemo, memo } from 'react';

// ====================== 常量定义 ======================
// 将样式常量提取，便于维护和复用
const STYLES = {
  CONTAINER: {
    border: "1px solid #e5e5e5",
    borderRadius: "8px",
    width: "500px",
    backgroundColor: "white",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
  } as const,
  
  HEADER: {
    backgroundColor: "#3a3a3a",
    padding: "14px 20px",
    fontWeight: "600" as const,
    fontSize: "15px",
    color: "white",
    borderBottom: "1px solid #e5e5e5",
    borderTopLeftRadius: "7px",
    borderTopRightRadius: "7px",
    letterSpacing: "0.3px",
    display: "flex" as const,
    alignItems: "center" as const
  } as const,
  
  CHECKBOX: {
    width: "16px",
    height: "16px",
    marginRight: "6px",
    cursor: "pointer" as const,
    accentColor: "#4a90e2" as const
  } as const,
  
  LABEL_TEXT: {
    fontSize: "13px",
    color: "#333",
    whiteSpace: "nowrap" as const,
    lineHeight: "1.2"
  } as const,
  
  STATUS_INDICATOR: {
    padding: "10px 20px",
    backgroundColor: "#f8f9fa",
    borderTop: "1px solid #e5e5e5",
    borderBottomLeftRadius: "7px",
    borderBottomRightRadius: "7px",
    fontSize: "11px",
    color: "#666",
    display: "flex" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const
  } as const
};

// ====================== 类型定义 ======================
interface CheckboxItemProps {
  option: { value: string; label: string };
  isChecked: boolean;
  onChange: (value: string) => void;
  isSelectAll?: boolean;
}

// ====================== 子组件 ======================
/**
 * 单个复选框选项组件
 * 使用React.memo包装，避免不必要的重新渲染
 */
const CheckboxItem = memo(({ 
  option, 
  isChecked, 
  onChange, 
  isSelectAll = false 
}: CheckboxItemProps) => {
  // 使用useCallback缓存点击事件处理函数
  const handleChange = useCallback(() => {
    onChange(option.value);
  }, [onChange, option.value]);

  return (
    <div style={{ marginBottom: "12px" }}>
      <label style={{ 
        display: "flex", 
        alignItems: "center", 
        cursor: "pointer",
        padding: "2px 0",
        borderRadius: "4px",
        transition: "background-color 0.2s",
        ":hover": {
          backgroundColor: "#f8f9fa"
        }
      } as any}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          style={STYLES.CHECKBOX}
        />
        <span style={{ 
          ...STYLES.LABEL_TEXT,
          fontWeight: isSelectAll ? "500" : "400"
        }}>
          {option.label}
        </span>
      </label>
    </div>
  );
});

CheckboxItem.displayName = 'CheckboxItem';

/**
 * 头部标题组件
 */
const Header = () => (
  <div style={STYLES.HEADER}>
    <div style={{
      width: "4px",
      height: "16px",
      backgroundColor: "#4a90e2",
      marginRight: "10px",
      borderRadius: "2px"
    }}></div>
    Status
  </div>
);

/**
 * 状态指示器组件
 */
const StatusIndicator = ({ 
  selectedCount, 
  totalCount 
}: { 
  selectedCount: number; 
  totalCount: number 
}) => {
  const isAllSelected = selectedCount === totalCount && totalCount > 0;
  
  return (
    <div style={STYLES.STATUS_INDICATOR}>
      <div>
        Selected: <span style={{ fontWeight: "600", color: "#4a90e2" }}>
          {selectedCount} of {totalCount}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: isAllSelected ? "#28a745" : "#4a90e2",
          marginRight: "5px"
        }}></div>
        {isAllSelected ? "All selected" : "Partial selection"}
      </div>
    </div>
  );
};

// ====================== 主组件 ======================
/**
 * 状态复选框组主组件
 * 提供多选功能，支持全选和分组显示
 */
const StatusCheckboxGroup: React.FC = () => {
  // 状态管理：选中的选项值列表
  const [selected, setSelected] = useState<string[]>([]);

  // 选项配置：使用useMemo缓存，避免每次渲染重新创建
  const options = useMemo(() => [
    { value: "ALL", label: "Select All" },
    { value: "NEW", label: "New (NEW)" },
    { value: "ACT", label: "Active (ACT)" },
    { value: "PCG", label: "Price Change (PCG)" },
    { value: "BOM", label: "Back on Market (BOM)" },
    { value: "EXT", label: "Extended (EXT)" },
    { value: "RAC", label: "Reactivated (RAC)" },
    { value: "CTG", label: "Contingent (CTG)" },
    { value: "UA", label: "Under Agreement" },
    { value: "SLD", label: "Sold (SLD)" },
    { value: "WDN", label: "Temporarily Withdrawn (WDN)" },
    { value: "EXP", label: "Expired (EXP)" },
    { value: "CAN", label: "Canceled (CAN)" },
    { value: "CSO", label: "Coming Soon (CSO)" }
  ], []);

  // 计算属性：排除"全选"后的所有选项值
  const allValues = useMemo(() => 
    options.filter(opt => opt.value !== "ALL").map(opt => opt.value), 
    [options]
  );

  // 计算属性：判断是否全部选中
  const isAllSelected = useMemo(() => 
    selected.length === allValues.length && allValues.length > 0, 
    [selected.length, allValues.length]
  );

  // 事件处理：全选/取消全选
  const handleSelectAll = useCallback(() => {
    if (isAllSelected) {
      setSelected([]);
    } else {
      setSelected([...allValues]);
    }
  }, [isAllSelected, allValues]);

  // 事件处理：单个选项状态切换
  const handleOptionChange = useCallback((value: string) => {
    setSelected(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value)  // 如果已选中，则移除
        : [...prev, value]                // 如果未选中，则添加
    );
  }, []);

  // 选项分组：左右两列
  const leftOptions = useMemo(() => options.slice(0, 7), [options]);
  const rightOptions = useMemo(() => options.slice(7), [options]);

  return (
    <div style={STYLES.CONTAINER}>
      {/* 头部标题 */}
      <Header />
      
      {/* 主要内容区域 */}
      <div style={{ display: "flex", padding: "20px 15px 18px 20px" }}>
        {/* 左列选项 */}
        <div style={{ 
          flex: "0 0 200px",
          paddingRight: "15px", 
          borderRight: "1px solid #f0f0f0" 
        }}>
          {leftOptions.map((option) => (
            <CheckboxItem
              key={option.value}
              option={option}
              isChecked={option.value === "ALL" ? isAllSelected : selected.includes(option.value)}
              onChange={option.value === "ALL" ? handleSelectAll : handleOptionChange}
              isSelectAll={option.value === "ALL"}
            />
          ))}
        </div>

        {/* 右列选项 */}
        <div style={{ 
          flex: "1",
          paddingLeft: "15px",
          minWidth: "220px"
        }}>
          {rightOptions.map((option) => (
            <CheckboxItem
              key={option.value}
              option={option}
              isChecked={selected.includes(option.value)}
              onChange={handleOptionChange}
            />
          ))}
        </div>
      </div>
      
      {/* 底部状态指示器 */}
      <StatusIndicator 
        selectedCount={selected.length} 
        totalCount={allValues.length} 
      />
    </div>
  );
};

export default memo(StatusCheckboxGroup);