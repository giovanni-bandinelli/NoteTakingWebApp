import styles from './RadioOption.module.css'; 
export default function RadioOption({ 
    id, 
    name, 
    value, 
    title, 
    description, 
    isChecked = false, 
    Icon, 
    onChange
  }) {
    return (
      <label htmlFor={id} className={styles.themeOption}>
        <div className={styles.contentWrapper}>
                <div className={styles.iconContainer}>
                    {Icon && <Icon />}
                </div>
                <div className="optionContent">
                    <div className="optionTitle text-preset-4">{title}</div>
                    <div className="optionDescription text-preset-5">{description}</div>
                </div>
        </div>

        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={isChecked}
          className="themeRadio"
          onChange={onChange}
        />
      </label>
    );
  }
