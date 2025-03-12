import { useMutation } from "@tanstack/react-query";
import { i as useTrans, t as toast, m as message, n as showHttpErrorToast, b as apiClient, I as IconButton, Q as CloseIcon } from "../server-entry.mjs";
import { jsxs, jsx } from "react/jsx-runtime";
import clsx from "clsx";
function useCancelSubscription() {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (props) => cancelSubscription(props),
    onSuccess: (response, payload) => {
      toast(
        payload.delete ? trans(message("Subscription deleted.")) : trans(message("Subscription cancelled."))
      );
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function cancelSubscription({
  subscriptionId,
  ...payload
}) {
  return apiClient.post(`billing/subscriptions/${subscriptionId}/cancel`, payload).then((r) => r.data);
}
function useResumeSubscription() {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (props) => resumeSubscription(props),
    onSuccess: () => {
      toast(trans(message("Subscription renewed.")));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function resumeSubscription({ subscriptionId }) {
  return apiClient.post(`billing/subscriptions/${subscriptionId}/resume`).then((r) => r.data);
}
function SectionHelper({
  title,
  description,
  actions,
  color = "primary",
  className,
  size = "md",
  leadingIcon,
  onClose
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        className,
        "rounded-panel px-10 pb-10",
        leadingIcon || onClose ? "py-4" : "py-10",
        size === "sm" ? "text-xs" : "text-sm",
        color === "positive" && "bg-positive/focus",
        color === "warning" && "bg-warning/focus",
        color === "danger" && "bg-danger/focus",
        color === "primary" && "bg-primary/focus",
        color === "neutral" && "border bg",
        color === "bgAlt" && "border bg-alt"
      ),
      children: [
        title && /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-6", children: [
          leadingIcon,
          /* @__PURE__ */ jsx("div", { className: "font-medium", children: title }),
          onClose ? /* @__PURE__ */ jsx(IconButton, { size: "xs", className: "ml-auto", onClick: () => onClose(), children: /* @__PURE__ */ jsx(CloseIcon, {}) }) : null
        ] }),
        description && /* @__PURE__ */ jsx("div", { children: description }),
        actions && /* @__PURE__ */ jsx("div", { className: "mt-14", children: actions })
      ]
    }
  );
}
export {
  SectionHelper as S,
  useResumeSubscription as a,
  useCancelSubscription as u
};
//# sourceMappingURL=section-helper-fd56ecf3.mjs.map
