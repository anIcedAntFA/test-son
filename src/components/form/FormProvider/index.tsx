import { ReactNode } from 'react';
import { FormProvider as RHFFormProvider, UseFormReturn } from 'react-hook-form';

interface IFormProviderProp<Type extends Record<string, any>> {
  methods: UseFormReturn<Type>;
  onSubmit: () => void;
  children: ReactNode;
}

function FormProvider<Type extends Record<string, any>>({
  methods,
  onSubmit,
  children,
}: IFormProviderProp<Type>) {
  return (
    <RHFFormProvider {...methods}>
      <form onSubmit={onSubmit} style={{ width: '100%' }}>
        {children}
      </form>
    </RHFFormProvider>
  );
}

export default FormProvider;
