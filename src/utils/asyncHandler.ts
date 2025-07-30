function asyncHandler(fn: (req: any, res: any, next: any) => Promise<any>) {
    return function (req: any, res: any, next: any) {
        fn(req, res, next).catch(next);
    };
}

export default asyncHandler;
