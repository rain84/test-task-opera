export const decorators = [
  (story: Function) => (
    <div className="flex justify-center p-2 space-x-4">{story()}</div>
  ),
]
