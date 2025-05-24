import { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface FilterProps {
  onFilterChange: (filters: FilterState) => void;
  category: 'cat' | 'dog';
}

export interface FilterState {
  priceRange: [number, number];
  types: string[];
  lifestage: string[];
}

// Default price ranges and filter options
const DEFAULT_PRICE_RANGE: [number, number] = [0, 50];
const DEFAULT_TYPES = {
  cat: ['Dry Food', 'Wet Food', 'Treats', 'Prescription'],
  dog: ['Dry Food', 'Wet Food', 'Treats', 'Raw Food']
};
const DEFAULT_LIFESTAGES = {
  cat: ['Kitten', 'Adult', 'Senior', 'All Life Stages'],
  dog: ['Puppy', 'Adult', 'Senior', 'All Life Stages']
};

const ProductFilter: React.FC<FilterProps> = ({ onFilterChange, category }) => {
  const [priceRange, setPriceRange] = useState<[number, number]>(DEFAULT_PRICE_RANGE);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLifestages, setSelectedLifestages] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const handlePriceChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setPriceRange(newRange);
  };
  
  const handleTypeChange = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };
  
  const handleLifestageChange = (stage: string) => {
    setSelectedLifestages(prev => 
      prev.includes(stage) 
        ? prev.filter(s => s !== stage) 
        : [...prev, stage]
    );
  };
  
  const applyFilters = () => {
    onFilterChange({
      priceRange,
      types: selectedTypes,
      lifestage: selectedLifestages
    });
  };
  
  const resetFilters = () => {
    setPriceRange(DEFAULT_PRICE_RANGE);
    setSelectedTypes([]);
    setSelectedLifestages([]);
    onFilterChange({
      priceRange: DEFAULT_PRICE_RANGE,
      types: [],
      lifestage: []
    });
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-extrabold mb-4 bg-white">Filters</h2>
        <Button 
          variant="outline" 
          className="md:hidden border-teal-500 text-teal-600 hover:bg-teal-50 hover:text-teal-700" 
          onClick={toggleFilter}
        >
          {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>
      
      <div className={`md:block ${isFilterOpen ? 'block' : 'hidden'}`}>
        {/* Price Range Slider */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Price Range</h3>
          <div className="px-2 bg">
            <Slider
              defaultValue={[priceRange[0], priceRange[1]]}
              max={50}
              step={1}
              value={[priceRange[0], priceRange[1]]}
              onValueChange={handlePriceChange}
              className="mb-4 bg-teal-800"
              
            />
            <div className="flex justify-between text-sm text-teal-700">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>
        
        {/* Types Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Type</h3>
          <div className="space-y-2">
            {DEFAULT_TYPES[category].map(type => (
              <div key={type} className="flex items-center">
                <Checkbox 
                  id={`type-${type}`} 
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={() => handleTypeChange(type)}
                  className="mr-2 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
                />
                <Label htmlFor={`type-${type}`} className="hover:text-teal-600 cursor-pointer">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Life Stage Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Life Stage</h3>
          <div className="space-y-2">
            {DEFAULT_LIFESTAGES[category].map(stage => (
              <div key={stage} className="flex items-center">
                <Checkbox 
                  id={`stage-${stage}`} 
                  checked={selectedLifestages.includes(stage)}
                  onCheckedChange={() => handleLifestageChange(stage)}
                  className="mr-2 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
                />
                <Label htmlFor={`stage-${stage}`} className="hover:text-teal-600 cursor-pointer">
                  {stage}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button 
            onClick={applyFilters} 
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
          >
            Apply Filters
          </Button>
          <Button 
            variant="outline" 
            onClick={resetFilters} 
            className="flex-1 border-teal-600 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;