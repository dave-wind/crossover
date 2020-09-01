import React, { FC, ReactNode, AllHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { rgbColor, typography } from "../shared/style";

const Label = styled.label<RadioProps>`
	cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
	font-size: 14px;
	font-weight: 700;
	position: relative;
    height: 1em;
    line-height: 1;
    padding: 8px;
	display: flex;
	align-items: center;
	opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const OptionalText = styled.span<RadioProps>`
	${(props) =>
        props.hideLabel &&
        css`
			border: 0px !important;
			clip: rect(0 0 0 0) !important;
			-webkit-clip-path: inset(100%) !important;
			clip-path: inset(100%) !important;
			height: 1px !important;
			overflow: hidden !important;
			padding: 0px !important;
			position: absolute !important;
			white-space: nowrap !important;
			width: 1px !important;
		`}
`;

const Description = styled.div`
	font-size: ${typography.size.s1}px;
	font-weight: ${typography.weight.regular};
	color: ${rgbColor.primary};
	margin-top: 4px;
	margin-left: calc(${typography.size.s2}px + 0.4em);
	width: 100%;
`;

const RadioWrapper = styled.div<RadioProps>`
	display: flex;
	align-items: center;
    flex-wrap: wrap;
    padding: 8px 0;
`;

const Error = styled.span`
	font-weight: ${typography.weight.regular};
	font-size: ${typography.size.s2}px;
	color: ${rgbColor.danger};
	margin-left: 6px;
	height: 1em;
	display: flex;
	align-items: center;
`;

export interface RadioProps extends Omit<AllHTMLAttributes<HTMLInputElement>, "as" | "label"> {
    /** 主题色 */
    appearance?: keyof typeof rgbColor;
    /** label展示 */
    label?: ReactNode;
    /** 是否隐藏label*/
    hideLabel?: boolean;
    /** 错误文本 */
    error?: string;
    /** 描述文本 */
    description?: string;
    /** wrapper类名 */
    wrapperClass?: string;
}

const Radio: FC<RadioProps> = (props) => {
    const {
        wrapperClass,
        error,
        description,
        label,
        hideLabel,
        style,
        appearance,
        ...restProps
    } = props;
    const { disabled } = props;

    return (
        <RadioWrapper className={`radio-wrapper-${appearance} ${wrapperClass}`} style={style}>
            <Label disabled={disabled}>
                <input
                    {...restProps}
                    aria-invalid={!!error}
                    type="radio"
                />
                <span>
                    <OptionalText hideLabel={hideLabel}>{label}</OptionalText>
                </span>
            </Label>
            {error && <Error>{error}</Error>}
            {description && <Description>{description}</Description>}
        </RadioWrapper>
    );
}

Radio.defaultProps = {
    appearance: 'primary',
    hideLabel: false,
};

export default Radio;