import { useState, useRef, useEffect } from "react";
import { Checkbox } from "@chakra-ui/react";
import { ChevronDown, ChevronUp } from "lucide-react";

function CustomSelectInput({
  value,
  onToggle,
  isOpen,
}: {
  value: string[];
  onToggle: () => void;
  isOpen: boolean;
}) {
  return (
    <div
      className='custom-select-input-container'
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
    >
      <input
        className={`custom-select-input ${isOpen ? "open" : ""}`}
        value={value.length > 0 ? value.join(", ") : ""}
        placeholder='Select option(s)'
        readOnly
        onChange={() => null}
      />
      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </div>
  );
}

export function CustomSelect({
  options,
  label,
  setValues,
  values,
}: {
  options: { label: string; value: string }[];
  label: string;
  setValues: (values: string[]) => void;
  values: string[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([...values]);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && selectedOptions.length > 0) setValues(selectedOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, selectedOptions]);

  return (
    <div className='custom-select' ref={selectRef}>
      <label className='custom-select-label'>{label}</label>
      <CustomSelectInput
        isOpen={isOpen}
        value={selectedOptions}
        onToggle={() => (options.length > 0 ? setIsOpen(!isOpen) : null)}
      />
      {isOpen ? (
        <div className='custom-select-wrapper'>
          {options.map((option) => (
            <div
              key={option.value}
              className='custom-select-option'
              onClick={(e) => {
                e.stopPropagation();
                if (selectedOptions.includes(option.value)) {
                  setSelectedOptions(
                    selectedOptions.filter((value) => value !== option.value)
                  );
                } else {
                  setSelectedOptions([...selectedOptions, option.value]);
                }
              }}
            >
              <Checkbox.Root checked={selectedOptions.includes(option.value)}>
                <Checkbox.HiddenInput />
                <Checkbox.Control cursor='pointer' width='14px' height='14px' />
                <Checkbox.Label className='custom-select-option-label'>
                  {option.label}
                </Checkbox.Label>
              </Checkbox.Root>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
