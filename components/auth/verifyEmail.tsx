"use client";

import { useGlobalHooks } from "@/hooks/globalHooks";
import React, { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Button from "../ui/button";
import CountDownTimer from "../ui/countDownTimer";
import { toast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { resendOTPAction, verifyCodeAction, verifyEmailAction } from "@/libs/actions/auth.actions";
import { useAuthContext } from "@/context/authContext";
import { handleError } from "@/utils/helper";

const INPUT_LENGHT = 6

export const VerifyEmail = ({ routePath }: { routePath?: string }) => {
  const { push } = useRouter();
  const { userData, setUserData } = useAuthContext()
  const { loading, errors, setLoading } = useGlobalHooks();
  const [timeLeft, setTimeLeft] = useState(10);

  const [verifyCode, setVerifyCode] = useState<Record<string, string>>({});

  const inputRefs = useRef([
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
  ]);

  const handleChange = (e: FormEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target as HTMLInputElement;
    setVerifyCode({ ...verifyCode, [`num${index + 1}`]: value });

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].current?.focus();
    }
  };

  const handleReSendOTP = async () => {
    setLoading(() => ({ ['resend']: true }));

    try {
      const rsp = await resendOTPAction(userData?.email);

      if (rsp.error) {
        handleError(
          rsp?.message || 'We encountered an error, please try again.',
        );
        setLoading(() => ({ ['resend']: false }));
        return;

      } else {
        toast({
          variant: "default",
          title: "Verify Email",
          description: rsp?.message,
        });
        setLoading(() => ({ ['resend']: false }));
      }
    } catch (error) {
      console.log(error);
      setLoading(() => ({ ['resend']: false }));
    }
  };

  const handleSuccess = useCallback((message: string) => {
    if (routePath) {
      push(routePath);
    } else {
      push("/onboarding");
      toast({
        variant: "default",
        title: "Verify Email",
        description: message,
      });
    }
  }, [routePath, push]);

  const codeValues = useMemo(() => Object.values(verifyCode), [verifyCode]);
  const verificationCode = useMemo(() => codeValues.join(""), [codeValues]);
  const isCodeComplete = useMemo(
    () =>
      codeValues.length === INPUT_LENGHT &&
      codeValues.every((code) => code !== ""),
    [codeValues],
  );

  const handleVerifyEmail = useCallback(
    async () => {
      if (!isCodeComplete) {
        handleError('Enter the code sent to your email');
        return;
      }

      setLoading(() => ({ ['verify']: true }));

      if (routePath) {
        setUserData((prev) => ({
          ...prev,
          code: verificationCode,
        }));
      }

      try {
        const rsp = routePath
          ? await verifyCodeAction({
            email: userData?.email,
            code: verificationCode,
          })
          : await verifyEmailAction({
            email: userData?.email,
            code: verificationCode,
          });

        if (rsp.error) {
          handleError(rsp?.message);
        } else {
          handleSuccess(rsp?.message || 'Email verification succesfull');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(() => ({ ['verify']: false }));
      }
    },
    [isCodeComplete, routePath, verificationCode, handleSuccess, setLoading, setUserData, userData?.email],
  );


  // When delete is pressed it should delete backward and jump focus to current input
  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    // Detect if backspace or delete key is clicked, if yes and the current input value is empty, jump backward to next one if available
    if (e.key === "Backspace" && !e.currentTarget?.value && index > 0) {
      inputRefs.current[index - 1].current?.focus();
    }
  };

  useEffect(() => {
    if (
      isCodeComplete
    ) {
      handleVerifyEmail();
    }
  }, [isCodeComplete, handleVerifyEmail]);


  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleVerifyEmail()
      }}
      className="flex w-full flex-col justify-between"
    >
      <ul className={`flex w-full items-center gap-2`}>
        {Array.from({ length: INPUT_LENGHT }).map((_, idx) => (
          <li className="flex items-center" key={idx}>
            <input
              ref={inputRefs.current[idx]}
              id={`num${idx + 1}`}
              type="password"
              name={`num${idx + 1}`}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyPress(e, idx)}
              maxLength={1}
              defaultValue={verifyCode[`num${idx + 1}` as keyof typeof verifyCode]}
              placeholder="0"
              className={`${errors.error && "errors animate__animated animate__shakeY"
                } form-controls h-[50px]! p-1! text-center`}

              required
            />
          </li>
        ))}
      </ul>

      <article>
        <div className="mt-10">
          <Button
            className="pry-btn w-full"
            type="submit"
            loading={loading["verify"]}
            disabled={!isCodeComplete}
          >
            Continue
          </Button>
        </div>

        <div className="btn outline-btn mt-5 flex w-full items-center justify-center gap-1 text-center">

          {timeLeft > 0 ? (
            <CountDownTimer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
          ) : (
            <Button
              className="text-sm! p-0! min-h-0!"
              type="button"
              onClick={handleReSendOTP}
              loading={loading["resend"]}
            >
              Resend code
            </Button>
          )}
        </div>
      </article>
    </form>
  );
};

