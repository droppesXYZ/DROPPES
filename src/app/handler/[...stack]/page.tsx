import { StackHandler } from "@stackframe/stack";
import { stackServerApp } from "../../../stack";

export default function Handler(props: unknown) {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-slate-900/80 rounded-xl shadow-lg p-6 border border-slate-800">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Configurações da Conta
        </h1>
        <StackHandler fullPage app={stackServerApp} routeProps={props} />
      </div>
    </div>
  );
}
