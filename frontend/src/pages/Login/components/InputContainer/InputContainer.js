import classes from './InputContainer.module.css'

export default function InputContainer({ label, bgColor, children }) {
    return (
        <div className={classes.container} stype={{ backgroundColor: bgColor }}>
            <label className={classes.label}>{label}</label>
            <div className={classes.context}>{children}</div>
        </div>
    );
}