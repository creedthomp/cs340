

interface Props {
    originalUrl?: string;
    onEnterFunc: (event: React.KeyboardEvent<HTMLElement>) => void;
    setAlias: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
    
}


const AuthenticationFields = (props: Props) => {
    

    return (
        <>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            size={50}
            id="aliasInput"
            placeholder="name@example.com"
            onKeyDown={props.onEnterFunc}
            onChange={props.setAlias}
          />
          <label htmlFor="aliasInput">Alias</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control bottom"
            id="passwordInput"
            placeholder="Password"
            onKeyDown={props.onEnterFunc}
            onChange={props.setPassword}
          />
          <label htmlFor="passwordInput">Password</label>
        </div>
      </>
    );
}

export default AuthenticationFields; 