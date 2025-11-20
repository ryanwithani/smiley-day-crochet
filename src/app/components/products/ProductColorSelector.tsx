// src/app/components/products/ProductColorSelector.tsx
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/app/lib/utils/utils';

interface ProductColorSelectorProps {
  colors: string[];
  colorNames: string[];
  selectedColor: string;
  onColorSelect: (color: string, colorName: string) => void;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
  selectedColorName?: string;
  className?: string;
}

export function ProductColorSelector({
  colors,
  colorNames,
  selectedColor,
  onColorSelect,
  size = 'medium',
  showLabel = true,
  selectedColorName,
  className = '',
}: ProductColorSelectorProps) {
  if (!colors || colors.length === 0) {
    return null;
  }

  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-7 w-7',
    large: 'h-10 w-10',
  };

  const handleColorClick = (color: string, index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const colorName = colorNames[index] || color;
    onColorSelect(color, colorName);
  };

  return (
    <div className={cn('space-y-2', className)}>
      {showLabel && (
        <label className="text-xs font-medium text-[#8B4513] block">
          Color
          {selectedColorName && (
            <span className="font-normal text-[#6B4423] ml-1">
              - {selectedColorName}
            </span>
          )}
        </label>
      )}
      <div className="flex items-center gap-2 flex-wrap" role="radiogroup" aria-label="Select color">
        {colors.map((color, index) => {
          const colorName = colorNames[index] || color;
          const isSelected = selectedColor === color;

          return (
            <motion.button
              key={`${color}-${index}`}
              type="button"
              onClick={(e) => handleColorClick(color, index, e)}
              style={{ backgroundColor: color }}
              className={cn(
                sizeClasses[size],
                'flex-shrink-0 rounded-full border-2 transition-all duration-200',
                isSelected
                  ? 'ring-2 ring-primary ring-offset-1 ring-offset-white border-white scale-110'
                  : 'border-border hover:scale-110 hover:border-primary'
              )}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Select color ${colorName}`}
              aria-pressed={isSelected}
              role="radio"
              aria-checked={isSelected}
              title={colorName}
            />
          );
        })}
      </div>
    </div>
  );
}