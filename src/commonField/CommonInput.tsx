import { TextFieldTypes, InputChangeEventDetail } from "@ionic/core";
import {
    IonButton,
    IonIcon,
    IonInput,
    IonTextarea,
    TextareaChangeEventDetail,
} from "@ionic/react";
import { alertCircleOutline } from "ionicons/icons";

import React, { KeyboardEvent } from "react";

import { Controller, Control, FieldErrors, FieldValues } from "react-hook-form";

interface IProps {
    type: TextFieldTypes;
    className: string;
    placeHolder?: string;
    name: string;
    fieldType: string;
    value?: string;
    control?: Control;
    inputIcon?: string;
    error?: any;
    disabled?: boolean;
    readonly?: boolean;
    rows?: number;
    maxlength?: number;
    minlength?: number;
    label?: string;
    onChange?: (event: CustomEvent<InputChangeEventDetail>) => void;
    onKeyDown?: (event: KeyboardEvent<InputChangeEventDetail>) => void;
    onIconClick?: () => void;
    onClick?: () => void;
}

const CommonInput: React.FC<IProps> = (props) => {
    const {
        type,
        className,
        placeHolder,
        name,
        control,
        error,
        fieldType,
        value,
        onIconClick,
        inputIcon,
        disabled = false,
        readonly = false,
    } = props;
    return (
        <>
            <Controller
                render={({ field }) =>
                    fieldType === "input" ? (
                        <IonInput
                            {...field}
                            type={type}
                            disabled={disabled}
                            readonly={readonly}
                            className={className}
                            placeholder={placeHolder}
                            onIonChange={(e: CustomEvent<InputChangeEventDetail>) =>
                                field.onChange(e)
                            }
                        />
                    ) : (
                        <IonTextarea
                            {...field}
                            className={className}
                            placeholder={placeHolder}
                            rows={4}
                            disabled={disabled}
                            readonly={readonly}
                            onIonChange={(e: CustomEvent<TextareaChangeEventDetail>) =>
                                field.onChange(e)
                            }
                        />
                    )
                }
                defaultValue={value}
                name={name}
                control={control}
            />
            {inputIcon ? (
                <>
                    <IonButton
                        className="input-icon-btn"
                        fill="clear"
                        onClick={onIconClick}
                    >
                        <IonIcon icon={inputIcon} />
                    </IonButton>
                </>
            ) : null}

            {error ? (
                <div className="auth-msg error">
                    <p>
                        <IonIcon icon={alertCircleOutline} />
                        {error?.message}
                    </p>
                </div>
            ) : null}
        </>
    );
};

export default React.memo(CommonInput);
