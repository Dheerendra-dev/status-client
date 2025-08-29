const SectionHeader = ({ 
  title, 
  buttonText, 
  buttonIcon: ButtonIcon, 
  onButtonClick,
  buttonStyle = {}
}) => {
  return (
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
      <button
        onClick={onButtonClick}
        className="btn btn-primary"
        style={buttonStyle}
      >
        {ButtonIcon && <ButtonIcon size={16} />}
        {buttonText}
      </button>
    </div>
  )
}

export default SectionHeader
