 import React, { useState, useCallback, useMemo, memo } from 'react';

// 任务2新增：STYLES样式常量
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

// ====================== 类型定义 ======================（任务3新增代码）
interface CheckboxItemProps {
  option: { value: string; label: string };
  isChecked: boolean;
  onChange: (value: string) => void;
  isSelectAll?: boolean;
}
// ====================== 子组件 ======================（任务4新增代码）
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

// 主组件（任务1+任务2的代码，保留不变）
const StatusCheckboxGroup: React.FC = () => {
  return <div>Status Checkbox Group</div>;
};

export default StatusCheckboxGroup;
